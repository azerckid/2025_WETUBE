import cors from "cors";

export const corsMiddleware = (req, res, next) => {
    cors({
        origin: [process.env.CLIENT_URL, "https://your-second-domain.com"],
        credentials: true, // 쿠키 사용 시 필수
    })(req, res, next);
};
