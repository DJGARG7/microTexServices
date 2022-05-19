const db = require("../../../config/db");
const totalBS = (req, res) => {
    const query =
        "SELECT sum(balance) as total FROM bs1 where AccType in ('Cash Account','Sundry Debtors');";
    try {
        db.query(query, (error, result) => {
            if (error) throw error;
            else {
                res.send(result[0].total);
            }
        });
    } catch (error) {
        console.log("balance sheet total failed due to ", error);
        res.status(400).send(error);
    }
};
module.exports = totalBS;
