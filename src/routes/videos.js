import express from "express";
import videoController from "../controller/videosController.js";
import { protectorMiddleware } from "../middleware/localsMiddleware.js";
const router = express.Router();

router.get("/", videoController.getVideos);
router.get("/search", videoController.getSearch);
router.get("/video/:id", videoController.getWatch);

router.route("/video/:id/edit").all(protectorMiddleware).get(videoController.getEdit).post(videoController.postEdit);
router.route("/upload").all(protectorMiddleware).get(videoController.getUpload).post(videoController.postUpload);
router.route("/video/:id/delete").all(protectorMiddleware).get(videoController.getDelete).post(videoController.postDelete);

router.post("/video/:id/comments", videoController.postComments);
router.post("/video/:id/comments/delete", videoController.postCommentsDelete);

export default router;