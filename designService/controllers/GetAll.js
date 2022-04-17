const db = require("../config/db");
const { sendResponse } = require("../../helper");

const FetchAll = (req, res) => {
    console.log(req.body);
    const query = "SELECT * FROM master_design;";
    db.query(query, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};

module.exports = FetchAll;
