import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// Importing routes.
import transactionRoute from "./routes/transactionRoute.js";

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// Middlewares.
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3005",
            "http://localhost:3003",
            "http://app:80",
            "http://app",
            "http://20.213.49.62:80",
            "http://20.213.49.62",
            "http://userservice:3007",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use("/transaction", transactionRoute);
app.listen(process.env.PORT || 3007, () =>
    console.log(
        `TransactionService running at port ${process.env.PORT || 3007}.`
    )
);
