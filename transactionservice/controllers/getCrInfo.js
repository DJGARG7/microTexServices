import { db, config } from "../config/db.js";
const getCrinfo = (req, res) => {
    const uid = req.params.uid;
    const type = req.params.type;
    console.log(uid, type);
    var query;
    if (type == "Sundry Creditors") {
        query =
            "SELECT billno,amount,t_id,t_date FROM `transactions` WHERE uid=? and CrDr='Cr' and billno in (SELECT billNumber FROM `grey_bills` WHERE accountID=? and status=1) order by billno;";
    } else if (type == "Creditors For Job") {
        query =
            "SELECT billno,amount,t_id,t_date FROM `transactions` WHERE uid=? and CrDr='Cr' and billno in (SELECT challanNo FROM `job_challans` WHERE accountID=? and status=1) order by billno;";
    } else if (type == "Creditors for process") {
        query =
            "SELECT billno,amount,t_id,t_date FROM `transactions` WHERE uid=? and CrDr='Cr' and billno in (SELECT challanNumber FROM `mill_challan` WHERE millID=? and status=1) order by billno;";
    } else {
        throw "payment failed";
    }

    db.query(query, [uid, uid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
};
export default getCrinfo;
