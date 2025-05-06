const isLoggedIn = (req, res, next) => {
    const loggedIn = req.session?.loggedIn;
    if (loggedIn) {
        next();
    } else {
        res.status(401).send("Unauthorized: Please log in.");
    }
};

export default isLoggedIn;