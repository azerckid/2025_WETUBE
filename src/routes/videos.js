import express from "express";
import videosController from "../controller/videosController.js";

const router = express.Router();

router.get("/", videosController.getVideos);
router.get("/search", videosController.getSearch);
router.get("/:id", videosController.getWatch);

router.post("/upload", videosController.postUpload);
router.post("/video/:id/edit", videosController.postEdit);
router.post("/video/:id/delete", videosController.postDelete);
router.post("/video/:id/comments", videosController.postComments);
router.post("/video/:id/comments/delete", videosController.postCommentsDelete);

export default router;