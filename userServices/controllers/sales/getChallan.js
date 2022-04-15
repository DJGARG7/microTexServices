const db = require("../../config/db");

const getChallan = (req, res) => {
    console.log(req.body);
    const query = "SELECT * FROM SALES_ORDER;";
    db.query(query, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};

module.exports = getChallan;
