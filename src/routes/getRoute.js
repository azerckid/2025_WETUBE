import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from index route");
});

router.get("/about", (req, res) => {
    res.send("Hello from about route");
});

router.get("/contact", (req, res) => {
    res.send("Hello from contact route");
});

export default router;
