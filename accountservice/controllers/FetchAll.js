const db = require("../config/db");

const FetchAll = (req, res) => {
    const data = req.body;
    console.log(req.body);
    const query = "SELECT * FROM accountmaster;";
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err.sql.Message);
        } else {
            res.send(result);
        }
    });
};

module.exports = FetchAll;
