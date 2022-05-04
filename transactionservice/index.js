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
        origin: "http://localhost:3000",
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
