const db = require("../../config/db");

const getChallanDetails = (req, res) => {
    const BILL_NO = req.params.BILL_NO;
    const query = "SELECT * FROM SALES_ORDER_DETAILS where BILL_NO=?;";
    try {
        db.query(query, [BILL_NO], (err, result) => {
            if (err) throw err;
            else res.send(result);
        });
    } catch (error) {
        console.log("getChallanDetails failed due to ", error);
        res.status(400).send(error);
    }
};

module.exports = getChallanDetails;
