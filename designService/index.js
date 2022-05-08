import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// Importing routes.
import authRoute from "./routes/designRoute.js";

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
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use("/designMaster", authRoute);
app.listen(process.env.PORT || 3004, () =>
    console.log(`DesignMaster running at port ${process.env.PORT || 3004}.`)
);
