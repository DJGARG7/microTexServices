const db = require("../../config/db");

const viewLogs = (req, res) => {
    db.query(
        `DELETE FROM master_userlogs WHERE loginDate < CURRENT_DATE() - 10;`
    );

    db.query("SELECT * FROM master_userlogs;", (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else res.send(result);
    });
};

module.exports = viewLogs;
