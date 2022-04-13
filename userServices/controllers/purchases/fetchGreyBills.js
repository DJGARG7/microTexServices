const db = require("../../config/db");
const fetchGreyBills = (req, res) => {
    if (!req.params.account) {
        db.query("SELECT * FROM grey_bills;", (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else res.send(result);
        });
    } else {
        db.query(
            "SELECT * FROM grey_bills WHERE accntnames=?;",
            [req.params.account],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else res.send(result);
            }
        );
    }
};

module.exports = fetchGreyBills;
