import { db, config } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import mysqlp from "mysql2/promise";
import Axios from "axios";
const Addaccountdata = async (req, res) => {
    const a_id = uuidv4();
    console.log(a_id);
    const data = req.body;
    data.RegDate = "2000/12/1";
    data.dist = 1;
    const ref = {
        status: "1",
        uuid: a_id,
    };
    const connection = await mysqlp.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    try {
        await connection.beginTransaction();
        // add to account master
        const query =
            "INSERT INTO master_account values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        await connection.execute(query, [
            a_id,
            data.AccName,
            data.AccType,
            data.address1,
            data.address2,
            data.address3,
            data.city,
            data.pincode,
            data.phoneNo,
            data.email,
            data.GSTIN,
            data.RegDate,
            data.propName,
            data.PAN,
            data.dist,
            data.transport,
            data.openingBal,
            data.CrDr,
            data.beneName,
            data.AccountNum,
            data.IFSC,
            data.shares,
        ]);
        await connection.commit();
        //send data to transaction service
        const transactData = {
            date: data.currDate,
            uid: a_id,
            accType: data.AccType,
            amt: data.openingBal,
            CrDr: data.CrDr,
            billno: 0,
            remark: "",
        };
        try {
            await Axios.post(
                "http://localhost:3007/transaction/",
                transactData
            );
        } catch (e) {
            //transaction service failed to transact
            await connection.execute("delete from master_account where uid=?", [
                a_id,
            ]);
            await connection.commit();
            await connection.end();
            console.log("vonnee failed ",e);
            res.status(400).send("insert failed due to issue in transaction service");
            return;
        }
        await connection.end();
        res.send(JSON.stringify(ref));
    } catch (e) {
        console.log("account insert failed due to  ", e);
        await connection.end();
        res.status(400).send(e);
    }
};
export default Addaccountdata;
