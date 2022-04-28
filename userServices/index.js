const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
dotenv.config();

// Importing routes.
const purchases = require("./routes/purchases");
const mill = require("./routes/mill");
const sales = require("./routes/sales");
const accessLog = require("./routes/accessLog");
const job = require("./routes/job");

// Middlewares.
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/purchases", purchases);
app.use("/mill", mill);
app.use("/sales", sales);
app.use("/accesslogs", accessLog);
app.use("/job", job);

app.listen(process.env.PORT || 3005, () =>
    console.log(`Server running at port ${process.env.PORT}.`)
);
