const db = require("../../config/db");

const fetchItems = (req, res) => {
    console.log("hello");
    db.query("SELECT * FROM grey_items;", (error, results) => {
        if (error) {
            res.status(500).send(`${error.sqlMessage}`);
        } else res.send(results);
    });
};

module.exports = fetchItems;
