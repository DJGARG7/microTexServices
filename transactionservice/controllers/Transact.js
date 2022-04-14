const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const db = require("../config/db");

const Transact = (req, res) => {
    console.log("transaction begins");
    const data = req.body;
    console.log(data);

    const query =
        "INSERT INTO DesignMaster values (?,?,?,?,?,?,?,?,?,?,?,?,?);";
    db.query(query, data, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else res.send("1");
    });
};

module.exports = Transact;
