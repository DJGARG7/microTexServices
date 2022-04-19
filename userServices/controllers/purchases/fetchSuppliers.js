const db = require("../../config/db");

const fetchSuppliers = (req, res) => {
    if (req.params.itemID) {
        if (req.params.itemID == "DEFAULT")
            res.send([{ uid: -1, AccName: "Please select an item." }]);
        else {
            db.query(
                "SELECT DISTINCT master_account.uid, AccName FROM master_account INNER JOIN GREY_BILLS NATURAL JOIN GREY_ITEM_DETAILS WHERE master_account.uid = GREY_BILLS.accountID AND itemID = ?;",
                [req.params.itemID],
                (error, results) => {
                    if (error) {
                        if (error) res.status(400).send(`${error.sqlMessage}`);
                    } else if (results.length === 0)
                        res.send([
                            { uid: -1, AccName: "No suppliers available." },
                        ]);
                    else {
                        res.send(results);
                    }
                }
            );
        }
    }
};

module.exports = fetchSuppliers;
