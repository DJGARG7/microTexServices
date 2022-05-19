const db = require("../../config/db");

const deleteUser = (req, res) => {
    db.query("DELETE FROM Firm WHERE uuid = ?", [req.params.uuid], (error) => {
        if (error) res.status(500).send(`${error.sqlMessage}`);
        else res.send("User deleted successfully!");
    });
};

module.exports = deleteUser;
