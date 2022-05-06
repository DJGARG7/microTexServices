const Axios = require("axios");
const config = require("../../config/transactionconnect");
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

const addgeneralpurchase = async (req, res) => {
    const data = req.body;
    const id = uuidv4();
    const ref = {
        status: "1",
        uuid: id,
    };

    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    await connection.beginTransaction();

    try {
        await connection.execute(
            "INSERT INTO general_purchase values (?,?,?,?,?,?);",
            [
                id,
                data.state.accntname,
                data.state.itemname,
                data.state.quantity,
                data.state.priceperqty,
                data.totalamount,
            ]
        );

        const transactData = {
            date: data.state.billdate,
            uid: data.accntid,
            accType: data.accntType,
            amt: data.totalamount,
            CrDr: data.CrDr,
            billno: data.state.billno,
            remark: "general purchase",
        };

        try {
            await Axios.post(
                "http://transactionservice:3007/transaction/",
                transactData
            );
            await connection.commit();
            res.send(JSON.stringify(ref));
        } catch (e) {
            connection.rollback();
            res.send(e);
        }
    } catch (e) {
        connection.rollback();
        res.status(400).send(`${e.sqlMessage}`);
    }
};

module.exports = addgeneralpurchase;
