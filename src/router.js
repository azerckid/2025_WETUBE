import express from "express";
import authRouter from "./routes/auth.js";
import pagesRouter from "./routes/pages.js";
import usersRouter from "./routes/users.js";
import videosRouter from "./routes/videos.js";

const router = express.Router();

router.use("/", pagesRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/videos", videosRouter);

export default router;
