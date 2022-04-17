const mysql = require("mysql2/promise");
const config = require("../config/transactionconnect");
const { v4: uuidv4 } = require("uuid");
const Transact = async (req, res) => {
    const t_id = uuidv4();
    // const data = req.body;
    const data = {
        date: "2022/03/03",
        uid: "355710ed-cb04-470e-a2db-5ade11a66480",
        accType: "Sundry Debtors",
        amt: 10,
        CrDr: "Dr",
        billno: 123,
    };
    console.log(data);
    console.log("transaction begins");
    const connection = await mysql.createConnection(config);
    try {
        
        await connection.execute(
            "SET TRANSACTION ISOLATION LEVEL READ COMMITTED"
        );
        await connection.beginTransaction();
        //update balance in currbalance
        if (data.CrDr == "Cr") {
            data.amt = data.amt * -1;
        }
        await connection.execute(
            "update currbalance set balance = balance + ? where uid=?",
            [data.amt,data.uid]
        );
        //fetch new balance
        const result = await connection.execute(
            "select balance from currbalance where uid=?",
            [data.uid]
        );
        const new_bal = result[0][0].balance;
        //insert transaction with new balance
        await connection.execute(
            "insert into transactions values (?,?,?,?,?,?,?,?)",
            [
                t_id,
                data.date,
                data.uid,
                data.accType,
                data.amt,
                data.CrDr,
                new_bal,
                data.billno,
            ]
        );
        await connection.commit();
        res.send("1");
    } catch (e) {
        console.log("transaction failed due to  ", e);
        connection.rollback();
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
