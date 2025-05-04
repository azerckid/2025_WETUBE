import express from "express";
import dotenv from "dotenv";
import path from "path";
import router from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
