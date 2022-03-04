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
app.use(cors());
app.use(express.json());

app.use("/accountMaster", authRoute);

app.listen(3003, () => console.log("Server running at port 3003."));
