import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.route("/login").get(authController.getLogin).post(authController.postLogin);
router.route("/join").get(authController.getJoin).post(authController.postJoin);
router.get("/logout", authController.getLogout);

export default router;