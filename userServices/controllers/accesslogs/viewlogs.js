const db = require("../../config/db");
const viewlogs = (req, res) => {
    db.query(
        `DELETE FROM master_userlogs WHERE loginDate < CURRENT_DATE() - 10;`
    );
    const query = "SELECT * FROM master_userlogs;";
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else res.send(result);
    });
};

module.exports = viewlogs;
