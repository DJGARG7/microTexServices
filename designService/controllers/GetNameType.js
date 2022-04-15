const db = require("../config/db");

const GetNameType = (req, res) => {
    console.log(req.body);
    const data = {};
    const query =
        "SELECT distinct(name) FROM DesignMaster;SELECT distinct(cloth_Type) FROM DesignMaster;";
    db.query(query, (err, result) => {
        if (err) res.status(400).send(err);
        else res.send(result);
    });

    // db.query
};

module.exports = GetNameType;
