const db = require("../../config/db");

const fetchChallan = async (req, res) => {
    if (!req.params.millID || !req.params.itemID) {
        res.send({});
    } else {
        let query = `SELECT challanNumber, greyBillNumber, millID, AccName, itemID, itemName, sentDate, sentTaka, sentMeters 
		FROM mill_challan NATURAL JOIN mill_challan_details NATURAL JOIN grey_items INNER JOIN master_account 
		WHERE millID = uid AND millID = ? AND itemID = ? AND status = 0;`;

        db.query(
            query,
            [req.params.millID, req.params.itemID],
            (error, results) => {
                if (error) {
                    if (error) res.status(500).send(`${error.sqlMessage}`);
                } else {
                    res.send(results);
                }
            }
        );
    }
};

module.exports = fetchChallan;
