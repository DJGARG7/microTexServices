const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//     // Get token from request header.
//     const token = req.headers['accesstoken'];
//     // Access is denied to resource if token does not exist.
//     if (!token) res.status(401).send("Access denied.");

//     // Verify token if it exists.
//     try {
//         const verify = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verify;
//         req.isAuthenticated = true;
//         next();
//     } catch (error) {
//         res.status(401).send("Invalid token.");
//     }
// };

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(authenticate);
app.listen(3001, () => {
    console.log("Run on 3001");
});

app.post("/cityMaster/Add", (req, res) => {
    console.log("chal jaa be");
    const sql = "INSERT INTO CITYMASTER VALUES(?,?);";
    const cityname = req.body.City;
    const statename = req.body.State;

    db.query(sql, [cityname, statename], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send("Successfully added");
        }
    });
});

app.post("/cityMaster/Delete", (req, res) => {
    const sql = "DELETE FROM CITYMASTER WHERE CityName=?;";
    const cityname = req.body.City;

    db.query(sql, cityname, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.send("Successfully deleted");
    });
});

app.get("/cityMaster/getdata", (req, res) => {

    const sql = "SELECT * FROM CITYMASTER;";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.post("/cityMaster/Update", (req, res) => {
    const sql =
        "UPDATE CITYMASTER SET CityName=?,StateName=? WHERE CityName=?;";
    const cityname = req.body.City;
    const statename = req.body.State;
    const oldcity = req.body.oldcity;
    db.query(sql, [cityname, statename, oldcity], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send("Successfully updated");
        }
    });
});
