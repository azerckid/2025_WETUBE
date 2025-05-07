import User from "../models/User";
import bcrypt from "bcryptjs";

const usersController = {
    getUser: async (req, res) => {
        const {
            params: { id },
        } = req;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).render("404", { pageTitle: "User Not Found" });
        }
        res.render("users/userDetail", { pageTitle: "User Detail", user });
    },
    getEditProfile: (req, res) => {
        res.render("users/editProfile", { pageTitle: "Edit Profile" });
    },
    postEditProfile: async (req, res) => {
        const {
            session: {
                user: { _id, email: currentEmail, username: currentUsername, avatarUrl: currentAvatarUrl },
            },
            body: { name, email, location, username },
            file,
        } = req;
        try {
            // 이메일 중복 체크 (현재 사용자 제외)
            if (email !== currentEmail) {
                const existingEmailUser = await User.findOne({ email });
                if (existingEmailUser) {
                    return res.status(400).render("users/editProfile", {
                        pageTitle: "Edit Profile",
                        errorMessage: "This email is already taken.",
                    });
                }
            }
            // 유저네임 중복 체크 (현재 사용자 제외)
            if (username !== currentUsername) {
                const existingUsernameUser = await User.findOne({ username });
                if (existingUsernameUser) {
                    return res.status(400).render("users/editProfile", {
                        pageTitle: "Edit Profile",
                        errorMessage: "This username is already taken.",
                    });
                }
            }
            // 업데이트
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { name, email, location, avatarUrl: file ? file.path : currentAvatarUrl, username },
                { new: true }
            );

            req.session.user = updatedUser;
            return res.redirect(`/users/${updatedUser._id}`);
        } catch (error) {
            console.error(error);
            return res.status(500).render("users/editProfile", {
                pageTitle: "Edit Profile",
                errorMessage: "Could not update profile. Please try again later.",
            });
        }
    },
    postDeleteProfile: (req, res) => {
        res.send("deleteProfile")
    },
    getChangePassword: (req, res) => {
        if (req.session.user.socialOnly === true) {
            return res.redirect("/videos");
        }
        return res.render("users/changePass", { pageTitle: "Change Password" });
    },
    postChangePassword: async (req, res) => {
        const {
            session: {
                user: { _id },
            },
            body: { oldPassword, newPassword, newPassword2 },
        } = req;
        try {
            if (newPassword !== newPassword2) {
                return res.status(400).render("users/changePass", {
                    pageTitle: "Change Password",
                    errorMessage: "New password confirmation does not match.",
                });
            }

            const user = await User.findById(_id);
            if (!user) {
                return res.status(404).render("users/changePass", {
                    pageTitle: "Change Password",
                    errorMessage: "User not found",
                });
            }
            const ok = await bcrypt.compare(oldPassword, user.password);
            if (!ok) {
                return res.status(400).render("users/changePass", {
                    pageTitle: "Change Password",
                    errorMessage: "Old password is wrong",
                });
            }
            user.password = newPassword;
            await user.save();
            req.session.destroy();
            return res.redirect("/auth/login");
        } catch (error) {
            console.error(error);
            return res.status(500).render("users/changePass", {
                pageTitle: "Change Password",
                errorMessage: "Internal server error",
            });
        }
    }
}

export default usersController;