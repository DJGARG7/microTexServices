const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
// Importing routes.
const transactionRoute = require("./routes/transactionRoute");

// Middlewares.
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

app.use("/transaction", transactionRoute);

app.listen(3007, () => console.log("Transaction Service running at 3007."));
