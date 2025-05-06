const fakeUser = {
    username: "henry",
    loggedIn: false,
};

const authController = {
    getLogin: (req, res) => {
        try {
            res.render("login", { pageTitle: "Login", fakeUser: fakeUser });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getJoin: (req, res) => {
        try {
            res.render("join", { pageTitle: "Join", fakeUser: fakeUser });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
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