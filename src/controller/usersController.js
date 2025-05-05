const usersController = {
    getUser: (req, res) => {
        res.send("getUser")
    },
    postEditProfile: (req, res) => {
        res.send("editProfile")
    },
    postDeleteProfile: (req, res) => {
        res.send("deleteProfile")
    }
}

export default usersController;