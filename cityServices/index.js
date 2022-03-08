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

app.post("/cityMaster/add", (req, res) => {
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

app.post("/cityMaster/delete", (req, res) => {
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

app.get("/cityMaster/get", (req, res) => {
    db.query("SELECT * FROM CITYMASTER;", (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
});

app.post("/cityMaster/update", (req, res) => {
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
