import express from "express";
import videoController from "../controller/videosController.js";

const router = express.Router();

router.get("/", videoController.getVideos);
router.get("/search", videoController.getSearch);
router.get("/video/:id", videoController.getWatch);

router.route("/video/:id/edit").get(videoController.getEdit).post(videoController.postEdit);
router.route("/upload").get(videoController.getUpload).post(videoController.postUpload);
router.route("/video/:id/delete").get(videoController.getDelete).post(videoController.postDelete);

router.post("/video/:id/comments", videoController.postComments);
router.post("/video/:id/comments/delete", videoController.postCommentsDelete);

export default router;