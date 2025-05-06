const fakeUser = {
    username: "henry",
    loggedIn: false,
};

const usersController = {
    getUser: (req, res) => {
        res.render("userDetail", { pageTitle: "User Detail" });
    },
    postEditProfile: (req, res) => {
        res.send("editProfile")
    },
    postDeleteProfile: (req, res) => {
        res.send("deleteProfile")
    }
}

export default usersController;