const db = require("../../config/db");

const addItem = (req, res) => {
    db.query(
        "INSERT INTO grey_items VALUES (NULL, ?);",
        [req.body.itemName],

        (error) => {
            if (error) {
                if (error) {
                    if (error.errno === 1062)
                        res.status(400).send(
                            `'${req.body.itemName}' already exists.`
                        );
                    else res.status(500).send(`${error.sqlMessage}`);
                }
            } else res.send("Item added successfully!");
        }
    );
};

module.exports = addItem;
