const db = require("../config/db");
const {sendResponse} = require('../../helper');

const Deleteaccountdata = (req, res) => {
    const uuid = req.params.id;
    const query = "DELETE FROM DesignMaster WHERE uid=?;";
    // console.log(data);
    db.query(query, [uuid], (err, result) => sendResponse(res, err, result));
}

module.exports = Deleteaccountdata;
