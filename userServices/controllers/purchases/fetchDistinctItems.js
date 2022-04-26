const db = require("../../config/db");

const fetchDistinctItems = (req, res) => {
    db.query(
        "SELECT DISTINCT(itemName), gi.itemID FROM grey_items AS gi, grey_bill_details AS gid WHERE gi.itemID = gid.itemID;",
        (error, results) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else res.send(results);
        }
    );
};

module.exports = fetchDistinctItems;
