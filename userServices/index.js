const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
// Importing routes.
const authRoute = require("./routes/auth");

// Middlewares.
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

app.use("/userservice", authRoute);

app.listen(3005, () => console.log("UserService running at 3005."));
