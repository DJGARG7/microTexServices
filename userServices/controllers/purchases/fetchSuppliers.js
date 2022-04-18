const db = require("../../config/db");

const fetchSuppliers = (req, res) => {
    if (req.params.itemID) {
        db.query(
            "SELECT DISTINCT accountmaster.uid, AccName FROM accountmaster INNER JOIN GREY_BILLS NATURAL JOIN GREY_ITEM_DETAILS WHERE accountmaster.uid = GREY_BILLS.accountID AND itemID = ?;",
            [req.params.itemID],
            (error, results) => {
                if (error) {
                    if (error) res.status(400).send(`${error.sqlMessage}`);
                } else res.send(results);
            }
        );
    }
};

module.exports = fetchSuppliers;
