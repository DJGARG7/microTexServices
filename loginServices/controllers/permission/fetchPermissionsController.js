const db = require("../../config/db");

const fetchPermissions = (req, res) => {
    db.query("SELECT * FROM Permissions", (error, results) => {
        if (error) res.status(400).send(`${error.sqlMessage}`);
        else res.send(results);
    });
};

module.exports = fetchPermissions;
