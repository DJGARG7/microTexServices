const db = require("../../config/db");

const deletegeneratepurchase = (req, res) => {
    const uuid = req.params.id;
    const query = "DELETE FROM general_purchase WHERE uuid=?;";
    db.query(query, [uuid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(`${err.sqlMessage}`);
        } else {
            res.send("1");
        }
    });
};

module.exports = deletegeneratepurchase;
