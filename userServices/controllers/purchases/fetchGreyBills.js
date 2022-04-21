const db = require("../../config/db");

const fetchGreyBills = (req, res) => {
    if (!req.params.accountID && !req.params.itemID) {
        // For "View Purchases table.
        db.query("SELECT * FROM GREY_PURCHASES;", (err, result) => {
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
        let query = `SELECT billNumber, billDate, AccName, GREY_ITEMS.itemID AS itemID, itemName, taka, meters 
		FROM GREY_BILLS NATURAL JOIN GREY_ITEM_DETAILS INNER JOIN master_account INNER JOIN GREY_ITEMS 
		WHERE GREY_BILLS.accountID = master_account.uid AND GREY_ITEM_DETAILS.itemID = GREY_ITEMS.itemID 
		AND GREY_BILLS.accountID = ? AND GREY_ITEM_DETAILS.itemID = ?;`;

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
