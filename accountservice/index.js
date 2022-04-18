import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// Importing routes.
import accountRoute from "./routes/accountRoute.js";

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// Middlewares.
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use("/accountMaster", accountRoute);
app.listen(3003, () => console.log("Account Master running at 3003."));
