import express from "express";
import usersController from "../controller/usersController.js";

const router = express.Router();

router.get("/:id", usersController.getUser);

router.post("/edit", usersController.postEditProfile);
router.post("/delete", usersController.postDeleteProfile);

export default router;