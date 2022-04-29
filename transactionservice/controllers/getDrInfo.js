import { db, config } from "../config/db.js";
const getDrinfo = (req, res) => {
    const uid = req.params.uid;
    console.log(uid);
    const query =
        "SELECT billno,amount,t_id,t_date FROM `transactions` WHERE uid=? and CrDr='Dr' and billno in (SELECT BILL_NO FROM `sales_order` WHERE CNAME=? and status=1) order by billno;";
    db.query(query, [uid, uid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
};
export default getDrinfo;
