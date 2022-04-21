const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
// Importing routes.
const purchaseRoute = require("./routes/purchaseRoute");
const saleRoute = require("./routes/saleRoute");
const accesslogs = require("./routes/accesslogs");
const jobRoutes = require("./routes/jobRoutes");

// Middlewares.
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());

app.use("/purchases", purchaseRoute);
app.use("/sales", saleRoute);
app.use("/accesslogs", accesslogs);
app.use("/job",jobRoutes)

app.listen(3005, () => console.log("UserService running at 3005."));
