import express from "express";
import postRouter from "./postRoute.js";
import getRouter from "./getRoute.js";

const router = express.Router();

router.use("/", getRouter);
router.use("/", postRouter);

export default router;
