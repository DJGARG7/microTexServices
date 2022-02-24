const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");

const app = express();
dotenv.config();

// Importing routes.
const authRoute = require("./routes/auth");

// Middlewares.
app.use(cors());
app.use(express.json());
app.use("/user", authRoute);

app.listen(3002, () => console.log("Server running at port 3002."));
