const db = require("../../config/db");

const fetchSuppliers = (req, res) => {
    if (req.params.itemID) {
        if (req.params.itemID == "DEFAULT")
            res.send([{ uid: -1, AccName: "Please select an item." }]);
        else {
            db.query(
                `SELECT DISTINCT master_account.uid, AccName FROM 
                master_account INNER JOIN grey_bills NATURAL JOIN grey_bill_details 
                WHERE master_account.uid = grey_bills.accountID AND itemID = ? AND grey_bill_details.remTaka != 0;`,
                [req.params.itemID],
                (error, results) => {
                    if (error) {
                        if (error) res.status(500).send(`${error.sqlMessage}`);
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
