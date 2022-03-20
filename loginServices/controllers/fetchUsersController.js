const db = require("../config/db");

const fetchUsers = (req, res) => {
    db.query("SELECT uuid, user_id FROM Firm", (error, results) => {
        if (error) res.status(400).send(`${error.sqlMessage}`);
        else res.send(results);
    });
};

module.exports = fetchUsers;
