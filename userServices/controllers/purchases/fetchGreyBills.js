const db = require("../../config/db");

const fetchGreyBills = (req, res) => {
    if (!req.params.accountID && !req.params.itemID) {
        // For "View Purchases table.
        db.query("SELECT * FROM grey_purchases;", (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else res.send(result);
        });
    } else if (
        req.params.accountID === "DEFAULT" ||
        req.params.itemID === "DEFAULT"
    ) {
        res.send([]);
    } else {
        // For bills in Send to Mill
        let query = `SELECT billNumber, billDate, AccName, grey_items.itemID AS itemID, itemName, sum(taka) AS taka, sum(meters) AS meters 
		FROM grey_bills NATURAL JOIN grey_bill_details INNER JOIN master_account INNER JOIN grey_items 
		WHERE grey_bills.accountID = master_account.uid AND grey_bill_details.itemID = grey_items.itemID 
		AND grey_bills.accountID = ? AND grey_bill_details.itemID = ? GROUP BY billNumber;`;

        db.query(
            query,
            [req.params.accountID, req.params.itemID],
            (err, results) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else res.send(results);
            }
        );
    }
};

module.exports = fetchGreyBills;
