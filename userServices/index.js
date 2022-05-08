const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
dotenv.config();
const port = process.env.PORT || 3005;
// Importing routes.
const purchases = require("./routes/purchases");
const mill = require("./routes/mill");
const sales = require("./routes/sales");
const accessLog = require("./routes/accessLog");
const job = require("./routes/job");
const cashBook = require("./routes/cashBook");
const reports = require("./routes/reports");
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/purchases", purchases);
app.use("/mill", mill);
app.use("/sales", sales);
app.use("/accesslogs", accessLog);
app.use("/job", job);
app.use("/cashbook", cashBook);
app.use("/reports", reports);

app.listen(port, () => console.log(`UserService running at port ${port}.`));
