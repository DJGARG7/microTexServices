const db = require("../../config/db");

const getChallanDetails = (req, res) => {
    const BILL_NO=req.params.BILL_NO;
    const query = "SELECT * FROM sales_order_details where BILL_NO=?;";
    db.query(query, [BILL_NO], (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};

module.exports = getChallanDetails;
