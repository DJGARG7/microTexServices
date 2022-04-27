const db = require("../../config/db");

const getJobStocks = (req, res) => {
    const clothType = req.params.clothType;
    console.log(clothType);
    const query =
        "SELECT * FROM inventory where status='godown' and itemname=?;";
    try {
        db.query(query, [clothType], (error, result) => {
            if (error) throw error;
            else res.send(result);
        });
    } catch (error) {
        console.log("getJobStocks failed due to ", error);
        res.status(400).send(error);
    }
};

module.exports = getJobStocks;
