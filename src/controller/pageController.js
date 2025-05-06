const pageController = {

    getHome: (req, res) => {
        try {
            res.render("home", { pageTitle: "Home" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getAbout: (req, res) => {
        try {
            res.render("about", { pageTitle: "About" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getContact: (req, res) => {
        try {

            res.render("contact", { pageTitle: "Contact" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default pageController;