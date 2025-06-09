import express from "express";
import videosController from "../controller/videosController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id/view", videosController.registerView);

export default apiRouter;