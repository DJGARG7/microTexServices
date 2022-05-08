const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
var cors = require("cors");

const app = express();
dotenv.config();

// Importing routes.
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const permissionRoute = require("./routes/permission");

// Middlewares.
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:80",
            "http://localhost",
            "http://app:80",
            "http://app",
            "http://20.213.49.62/:80",
            "http://20.213.49.62/",
        ],
        credentials: true,
    })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/permissions", permissionRoute);

app.listen(process.env.PORT || 3002, () =>
    console.log(`AuthService running at port ${process.env.PORT || 3002}.`)
);
