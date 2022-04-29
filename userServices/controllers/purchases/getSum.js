const db = require("../../config/db");

const getSum = (req, res) => {
    if (!req.params.startDate || !req.params.endDate)
        res.status(400).send("Bad request");
    else {
        db.query(
            "SELECT sum(billAmount) sum FROM grey_bills WHERE billDate >= ?; AND billDate <= ?;",
            [req.params.startDate, req.params.endDate],
            (error, results) => {
                if (error) res.status(500).send(`${error.sqlMessage}`);
                else res.send(results);
            }
        );
    }
};

module.exports = getSum;
