import express from "express";
import authRouter from "./routes/auth.js";
import pagesRouter from "./routes/pages.js";
import usersRouter from "./routes/users.js";
import videosRouter from "./routes/videos.js";
import apiRouter from "./routes/apiRouter.js";

const router = express.Router();

router.use("/", pagesRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/videos", videosRouter);
router.use("/api", apiRouter);

export default router;
