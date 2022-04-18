const db = require("../../config/db");

const addItem = (req, res) => {
    db.query(
        "INSERT INTO GREY_ITEMS VALUES (NULL, ?, ?, ?);",
        [req.body.itemname, req.body.openingmts, req.body.ratepermts],

        (error) => {
            if (error) {
                if (error) res.status(400).send(`${error.sqlMessage}`);
            } else res.send("Item added successfully!");
        }
    );
};

module.exports = addItem;
