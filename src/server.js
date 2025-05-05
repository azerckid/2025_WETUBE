import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import router from "./router";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(cors({
    origin: [process.env.CLIENT_URL, "https://your-second-domain.com"],
    credentials: true, // 쿠키 사용 시 필수
}));
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

app.use((req, res) => {
    res.status(404).send("페이지를 찾을 수 없습니다.");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.CLIENT_URL} / ${process.env.NODE_ENV} mode`);
});