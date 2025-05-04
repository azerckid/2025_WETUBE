import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    res.send(`Login with ${username} and ${password}`);
});

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    res.send(`Register with ${username} and ${password}`);
});

router.post("/logout", (req, res) => {
    const { username, password } = req.body;
    res.send(`Logout with ${username} and ${password}`);
});

export default router;