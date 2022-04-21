const db = require("../../config/db");

const getChallan = (req, res) => {
    console.log(req.body);
    try {
        const query = "SELECT * FROM SALES_ORDER where status=0;";
        db.query(query, (error, result) => {
            if (error) throw error;
            else res.send(result);
        });
    } catch (error) {
        console.log("getChallan failed due to ", error);
        res.status(400).send(error);
    }
};

module.exports = getChallan;
