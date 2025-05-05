import express from "express";
import pageController from "../controller/pageController.js";

const router = express.Router();

router.get("/", pageController.getHome);
router.get("/about", pageController.getAbout);
router.get("/contact", pageController.getContact);

export default router;
