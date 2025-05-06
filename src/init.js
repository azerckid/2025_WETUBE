import "./db";
import "./models/Video";
import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on ${process.env.CLIENT_URL} / ${process.env.NODE_ENV} mode`);
});