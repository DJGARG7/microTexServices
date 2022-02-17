const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");

dotenv.config();

// Importing routes.
const authRoute = require("./routes/auth");

// Middlewares.
app.use(cors());
app.use(express.json());
app.use("/user", authRoute);

app.listen(5000, () => console.log("Server running at port 5000."));
// test commit