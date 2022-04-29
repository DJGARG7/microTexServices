import { db, config } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import mysql from "mysql2/promise";
const Transact = async (req, res) => {
    const t_id = uuidv4();
    const t_id2 = uuidv4();
    var cashCrDr = "Cr";
    const data = req.body;
    // const data = {
    //     date: "2022-03-03",
    //     uid: "7d9de9c0-e33b-4915-ab12-ab501ad8d6e3",
    //     accType: "Sundry Debtors",
    //     amt: 555,
    //     CrDr: "Dr",
    //     billno: 123,
    //     remark: "remark",
    // };
    console.log(data);
    const connection = await mysqlp.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    if (data.CrDr == "Cr") {
        data.amt = data.amt * -1;
        cashCrDr = "Dr";
    }
    try {
        var new_bal;
        var cash_bal;
        await connection.beginTransaction();
        //fetch uid of cash account
        const uid_cash = await connection.execute(
            "select uid from master_account where AccType='Cash Account'"
        );
        const uidCash = uid_cash[0][0].uid;
        //update/insert balance in currbalance
        const exist = await connection.execute(
            "select exists(select * from currbalance where uid=?) as ans",
            [data.uid]
        );
        if (exist[0][0].ans) {
            await connection.execute(
                "update currbalance set balance = balance + ? where uid=?",
                [data.amt, data.uid]
            );
            await connection.execute(
                "update currbalance set balance = balance - ? where uid = ?",
                [data.amt, uidCash]
            );
            //fetch new balances
            const result = await connection.execute(
                "select balance from currbalance where uid=?",
                [data.uid]
            );
            const result2 = await connection.execute(
                "select balance from currbalance where uid=?",
                [uidCash]
            );
            new_bal = result[0][0].balance;
            cash_bal = result2[0][0].balance;
        } else {
            // in case of opening balance (currently some doubts here)
            await connection.execute("insert into currbalance values (?,?)", [
                data.uid,
                data.amt,
            ]);
            new_bal = data.amt;
            cash_bal = data.amt;
            data.remark = "Opening Balance";
        }

        //insert transaction
        await connection.execute(
            "insert into transactions values (?,?,?,?,?,?,?,?,?)",
            [
                t_id,
                data.date,
                data.uid,
                data.accType,
                data.amt,
                data.CrDr,
                new_bal,
                data.billno,
                data.remark,
            ]
        );
        await connection.execute(
            "insert into transactions values (?,?,?,?,?,?,?,?,?)",
            [
                t_id2,
                data.date,
                uidCash,
                "Cash Account",
                data.amt,
                cashCrDr,
                cash_bal,
                data.billno,
                t_id,
            ]
        );
        await connection.commit();
        await connection.end();
        res.send("1");
    } catch (e) {
        console.log("transaction failed due to  ", e);
        await connection.rollback();
        await connection.end();
        res.status(400).send(e);
    }
};

export default Transact;

/*
transaction rules
if dr , add to balance
if cr , subtract from balance
+ balance means account is in debt
- balance means firm is in debt
*/
// cash account represents the firm...
//so - balance means firm is in debt
//+ balance means firm in profit/not in debt
