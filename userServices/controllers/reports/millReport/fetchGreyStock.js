const db = require("../../../config/db");

const fetchGreyStock = (req, res) => {
    db.query("SELECT * FROM grey_inventory;", (error, results) => {
        if (error) {
            if (error) res.status(500).send(`${error.sqlMessage}`);
        } else {
            res.send(results);
        }
    });
};

module.exports = fetchGreyStock;
