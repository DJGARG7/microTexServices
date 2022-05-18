const db = require("../../../config/db");

const fetchMillPending = (req, res) => {
    db.query("SELECT * FROM mill_pending;", (error, results) => {
        if (error) {
            if (error) res.status(500).send(`${error.sqlMessage}`);
        } else {
            res.send(results);
        }
    });
};

module.exports = fetchMillPending;
