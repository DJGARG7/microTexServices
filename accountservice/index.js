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
        origin: [
            "http://localhost:3000",
            "http://localhost:80",
            "http://localhost",
            "http://app:80",
            "http://app",
            "http://20.213.49.62:80",
            "http://20.213.49.62",
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use("/accountMaster", accountRoute);
app.listen(process.env.PORT || 3003, () =>
    console.log(`AccountMaster running at port ${process.env.PORT || 3003}.`)
);
