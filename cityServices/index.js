const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();

// Connecting to database.
const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Middlewares.
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

app.listen(3001, () => {
    console.log("Run on 3001");
});

const authenticate = (req, res, next) => {
    // Access is denied if access token is not sent.
    if (!req.signedCookies.accessToken) res.status(401).send("Access denied.");
    else {
        try {
            // Validate token if it exists.
            const tokenPayload = jwt.verify(
                req.signedCookies.accessToken,
                process.env.JWT_SECRET
            );

            // Check if token belongs to user.
            if (req.header("userID") !== tokenPayload.userID)
                throw { name: "UnauthorizedUserError", error: new Error() };

            next();
        } catch (error) {
            if (error.name === "JsonWebTokenError")
                res.status(400).send("Invalid token.");
            else if (error.name === "UnauthorizedUserError")
                res.status(401).send("Unauthorized.");
            else if (error.name === "TokenExpiredError")
                res.status(403).send("Token expired.");
        }
    }
};

app.post("/cityMaster/add", authenticate, (req, res) => {
    db.query(
        "INSERT INTO CITYMASTER VALUES(?,?);",
        [req.body.City, req.body.State],
        (err) => {
            if (err) {
                console.log(err.sqlMessage);
                res.send(err);
            } else {
                res.send("1");
            }
        }
    );
});

app.post("/cityMaster/delete", authenticate, (req, res) => {
    db.query(
        "DELETE FROM CITYMASTER WHERE CityName=?;",
        req.body.City,
        (err) => {
            if (err) {
                console.log(err.sqlMessage);
                res.send(err.sqlMessage);
            } else res.send("Successfully deleted");
        }
    );
});

app.get("/cityMaster/get", authenticate, (req, res) => {
    db.query("SELECT * FROM CITYMASTER;", (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
});

app.post("/cityMaster/update", authenticate, (req, res) => {
    db.query(
        "UPDATE CITYMASTER SET CityName=?,StateName=? WHERE CityName=?;",
        [req.body.City, req.body.State, req.body.oldcity],
        (err) => {
            if (err) {
                console.log(err.sqlMessage);
                res.send(err.sqlMessage);
            } else {
                res.send("1");
            }
        }
    );
});
