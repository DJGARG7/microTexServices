const db = require("../config/db");

const FetchAll = (req, res) => {
    const query = "SELECT * FROM master_account;";
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
};

module.exports = FetchAll;
