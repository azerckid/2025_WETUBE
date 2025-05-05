import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.get("/login", authController.getLogin);
router.get("/join", authController.getJoin);
router.get("/logout", authController.getLogout);

router.post("/login", authController.postLogin);
router.post("/join", authController.postJoin);

export default router;