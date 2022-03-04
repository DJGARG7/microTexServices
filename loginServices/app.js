const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
var cors = require("cors");

const app = express();
dotenv.config();

// Importing routes.
const authRoute = require("./routes/auth");

// Middlewares.
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use("/auth", authRoute);

app.listen(process.env.PORT, () =>
    console.log(`Server running at port ${process.env.PORT}.`)
);
