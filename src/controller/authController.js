import User from "../models/User";
import bcrypt from "bcryptjs";

const authController = {
    getJoin: (req, res) => {
        try {
            res.render("join", { pageTitle: "Join" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    postJoin: async (req, res) => {
        const { email, username, password, password2, name, location } = req.body;
        if (password !== password2) {
            return res.status(400).render("join", {
                pageTitle: "Join",
                errorMessage: "Password confirmation does not match."
            });
        }
        const exists = await User.exists({ $or: [{ username }, { email }] });
        if (exists) {
            return res.status(400).render("join", {
                pageTitle: "Join",
                errorMessage: "This username/email is already taken.",
            });
        }
        try {
            await User.create({
                email,
                username,
                password,
                name,
                location,
            });
            return res.redirect("/auth/login");
        } catch (error) {
            console.error(error);
            res.status(500).render("join", { pageTitle: "Join", errorMessage: error._message });
        }
    },
    getLogin: (req, res) => {
        try {
            res.render("login", { pageTitle: "Login" });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).render("login", { pageTitle: "Login", errorMessage: "An account with this email does not exist." });
            }
            const ok = await bcrypt.compare(password, user.password);
            if (!ok) {
                return res.status(400).render("login", { pageTitle: "Login", errorMessage: "Wrong password." });
            }
            req.session.user = user;
            req.session.loggedIn = true;
            return res.redirect("/videos");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getLogout: (req, res) => {
        req.session.destroy();
        return res.redirect("/videos");
    }
}

export default authController;