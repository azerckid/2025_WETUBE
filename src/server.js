import express from "express";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import router from "./router";
import cors from "cors";
import { localsMiddleware } from "./middleware/localsMiddleware";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// app.set("views", path.join(__dirname, "views")); // ✅ 이 줄 중요!

app.use(cors({
    origin: [process.env.CLIENT_URL, "https://your-second-domain.com"],
    credentials: true, // 쿠키 사용 시 필수
}));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
            "'self'",
            "https:",
            "https://fonts.googleapis.com", // ✅ CSS 파일
        ],
        fontSrc: [
            "'self'",
            "https:",
            "https://fonts.gstatic.com", // ✅ 폰트 파일
        ],
        imgSrc: ["'self'", "https:", "data:"], // 여기에 https: 추가!
    },
}));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(sessionMiddleware);
app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "assets")));
app.use("/", router);

app.use((req, res) => {
    res.status(404).send("페이지를 찾을 수 없습니다.");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

export default app;