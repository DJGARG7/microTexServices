const db = require("../../config/db");

const getChallan = (req, res) => {
    const status = req.params.status;
    console.log(req.body);
    const query =
        "SELECT BILL_NO,ORDER_DATE,status,CNAME,master_account.AccName from sales_order inner join master_account on sales_order.CNAME = master_account.uid where status=?;";
    try {
        db.query(query, [status], (error, result) => {
            if (error) throw error;
            else res.send(result);
        });
    } catch (error) {
        console.log("getChallan failed due to ", error);
        res.status(400).send(error);
    }
};

module.exports = getChallan;
