const db = require("../../config/db");

const getTaka = (req, res) => {
    if (!req.params.billNumber || !req.params.itemID) {
        res.status(400).send("Bad request.");
        // } else if (req.params.itemID === "DEFAULT") {
        //     res.send([]);
    } else {
        db.query(
            "SELECT * FROM GREY_TAKA_DETAILS WHERE billNumber = ? AND itemID=?",
            [req.params.billNumber, req.params.itemID],
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
