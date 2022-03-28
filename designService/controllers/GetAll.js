const db = require("../config/db");
const { sendResponse } = require("../../helper");

const FetchAll = (req, res) => {
    console.log(req.body);
    const query = "SELECT * FROM DesignMaster;";
    db.query(query, (err, result) => sendResponse(res, err, result));
};

module.exports = FetchAll;
