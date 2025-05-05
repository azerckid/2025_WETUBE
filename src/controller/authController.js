const authController = {
    getLogin: (req, res) => {
        try {
            res.render("login", { pageTitle: "Login", title: "Wetube" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getJoin: (req, res) => {
        res.render("join", { pageTitle: "Join", title: "Wetube" });
    },
    getLogout: (req, res) => {
        res.send("logout")
    },
    postLogin: (req, res) => {
        res.send("postLogin")
    },
    postJoin: (req, res) => {
        res.send("postJoin")
    }
}

export default authController;