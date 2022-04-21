const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");

const postChallan = (req, res) => {
    console.log(req.body);
    res.send("Sent!");
};

module.exports = postChallan;
