const pageController = {
    getHome: (req, res) => {
        try {
            res.render("pages/home", { pageTitle: "Home" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getAbout: (req, res) => {
        try {
            res.render("pages/about", { pageTitle: "About" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getContact: (req, res) => {
        try {

            res.render("pages/contact", { pageTitle: "Contact" });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default pageController;