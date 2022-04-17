const db = require("../../config/db");

const fetchItems = (req, res) => {
    db.query("SELECT * FROM GREY_ITEMS;", (error, results) => {
        if (error) {
            if (error) res.status(400).send(`${error.sqlMessage}`);
        } else res.send(results);
    });
};

module.exports = fetchItems;
