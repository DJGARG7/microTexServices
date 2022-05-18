const db = require("../../../config/db");

const fetchMillReceived = (req, res) => {
    db.query("SELECT * FROM mill_received;", (error, results) => {
        if (error) {
            if (error) res.status(500).send(`${error.sqlMessage}`);
        } else {
            res.send(results);
        }
    });
};

module.exports = fetchMillReceived;
