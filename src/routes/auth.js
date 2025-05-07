import express from "express";
import authController from "../controller/authController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware/localsMiddleware.js";
const router = express.Router();

router.route("/login").all(publicOnlyMiddleware).get(authController.getLogin).post(authController.postLogin);
router.route("/join").all(publicOnlyMiddleware).get(authController.getJoin).post(authController.postJoin);
router.get("/github/start", publicOnlyMiddleware, authController.getGithubStart);
router.get("/github/callback", publicOnlyMiddleware, authController.getGithubCallback);
router.get("/logout", protectorMiddleware, authController.getLogout);

export default router;