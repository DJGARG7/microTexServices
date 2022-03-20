const db = require("../config/db");

const deleteUser = (req, res) => {
    db.query("DELETE FROM Firm WHERE uuid = ?", [req.body.uuid], (error) => {
        if (error) res.status(400).send(`${error.sqlMessage}`);
        else res.send("User deleted successfully!");
    });
};

module.exports = deleteUser;
