import User from "../models/User";
import bcrypt from "bcryptjs";

const authController = {
    getJoin: (req, res) => {
        try {
            res.render("auth/join", { pageTitle: "Join" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    postJoin: async (req, res) => {
        const { email, username, password, password2, name, location } = req.body;
        if (password !== password2) {
            return res.status(400).render("auth/join", {
                pageTitle: "Join",
                errorMessage: "Password confirmation does not match."
            });
        }
        const exists = await User.exists({ $or: [{ username }, { email }] });
        if (exists) {
            return res.status(400).render("auth/join", {
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
                avatarUrl: "",
                githubId: "",
                kakaoId: "",
                socialOnly: false,
            });
            return res.redirect("/auth/login");
        } catch (error) {
            console.error(error);
            res.status(500).render("auth/join", { pageTitle: "Join", errorMessage: error._message });
        }
    },
    getLogin: (req, res) => {
        const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
        try {
            res.render("auth/login", { pageTitle: "Login", GITHUB_CLIENT_ID });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email, socialOnly: false });
            if (!user) {
                return res.status(400).render("auth/login", { pageTitle: "Login", errorMessage: "An account with this email does not exist." });
            }
            const ok = await bcrypt.compare(password, user.password);
            if (!ok) {
                return res.status(400).render("auth/login", { pageTitle: "Login", errorMessage: "Wrong password." });
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
    },
    getGithubStart: (req, res) => {
        const baseUrl = "https://github.com/login/oauth/authorize";
        const config = {
            client_id: process.env.GITHUB_CLIENT_ID,
            allow_signup: false,
            scope: ["read:user", "user:email"],
        }
        const params = new URLSearchParams(config).toString();
        const finalUrl = `${baseUrl}?${params}`;
        return res.redirect(finalUrl);
    },
    getGithubCallback: async (req, res) => {
        try {
            const code = req.query.code;
            const baseUrl = "https://github.com/login/oauth/access_token";
            const config = {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            };
            const params = new URLSearchParams(config).toString();
            const finalUrl = `${baseUrl}?${params}`;

            const tokenRes = await fetch(finalUrl, {
                method: "POST",
                headers: { Accept: "application/json" },
            });
            const { access_token } = await tokenRes.json();

            if (!access_token) {
                return res.status(400).send("No access token received");
            }

            const userRes = await fetch("https://api.github.com/user", {
                headers: { Authorization: `token ${access_token}` },
            });
            const userJson = await userRes.json();
            let email = userJson.email;
            if (!email) {
                const emailRes = await fetch("https://api.github.com/user/emails", {
                    headers: { Authorization: `token ${access_token}` },
                });
                const emailData = await emailRes.json();
                const primaryEmail = emailData.find(e => e.primary && e.verified);
                email = primaryEmail?.email;
                if (!email) {
                    return res.status(400).send("Email not available");
                }
            }
            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({
                    email,
                    username: userJson.login,
                    name: userJson.name || userJson.login,
                    location: userJson.location,
                    avatarUrl: userJson.avatar_url,
                    githubId: userJson.id,
                    kakaoId: "",
                    socialOnly: true,
                });
            }

            req.session.user = user;
            req.session.loggedIn = true;
            return res.redirect("/videos");

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

export default authController;