import express from "express";
import usersController from "../controller/usersController.js";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middleware/localsMiddleware.js";

const router = express.Router();

router.get("/:id", usersController.getUser);
router.route("/profile/edit")
    .all(protectorMiddleware)
    .get(usersController.getEditProfile)
    .post(uploadFiles.single("avatar"), usersController.postEditProfile);

router.route("/profile/change-password")
    .all(protectorMiddleware)
    .get(usersController.getChangePassword)
    .post(usersController.postChangePassword);

router.post("/profile/delete", usersController.postDeleteProfile);

export default router;