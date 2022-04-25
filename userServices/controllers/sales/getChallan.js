const db = require("../../config/db");

const getChallan = (req, res) => {
    const status = req.params.status;
    console.log(req.body);
    const query = "SELECT * FROM SALES_ORDER where status=?;";
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
