const db = require("../../config/db");

const getTaka = (req, res) => {
    if (!req.params.itemID) {
        res.status(400).send("Bad request.");
    } else if (req.params.itemID === "DEFAULT") {
        res.send([]);
    } else {
        console.log("Taka");
        db.query(
            "SELECT * FROM grey_takadetails WHERE itemID=?",
            [req.params.itemID],
            (error, results) => {
                if (error) {
                    res.status(400).send(`${error.sqlMessage}`);
                } else {
                    res.send(results);
                }
            }
        );
    }
};

module.exports = getTaka;
