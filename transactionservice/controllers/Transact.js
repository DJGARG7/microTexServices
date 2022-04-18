const mysql = require("mysql2/promise");
const config = require("../config/transactionconnect");
const { v4: uuidv4 } = require("uuid");
const Transact = async (req, res) => {
    const t_id = uuidv4();
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
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    if (data.CrDr == "Cr") {
        data.amt = data.amt * -1;
    }
    try {
        var new_bal;
        await connection.beginTransaction();
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
            //fetch new balance
            const result = await connection.execute(
                "select balance from currbalance where uid=?",
                [data.uid]
            );
            new_bal = result[0][0].balance;
        } else {
            await connection.execute("insert into currbalance values (?,?)", [
                data.uid,
                data.amt,
            ]);
            new_bal = data.amt;
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

module.exports = Transact;

/*
transaction rules
if dr , add to balance
if cr , subtract from balance
+ balance means account is in debt
- balance means firm is in debt
*/
