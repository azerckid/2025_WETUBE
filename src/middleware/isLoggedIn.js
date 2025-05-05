const isLoggedIn = (req, res, next) => {
    const loggedIn = req.session?.user; // 예시
    if (loggedIn) {
        next();
    } else {
        res.status(401).send("Unauthorized: Please log in.");
    }
};

export default isLoggedIn;