const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const Axios = require("axios");
const makeBill = async (req, res) => {
    const data = req.body;
    console.log(data);
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();
    try {
        await connection.execute(
            "update SALES_ORDER set status=1 where CNAME=?",
            [data.uid]
        );
        await connection.commit();
        await Axios.post("http://localhost:3007/transaction/", data);
        await connection.commit();
        await connection.end();
        res.send("1");
    } catch (error) {
        console.log("billing failed due to  ", error);
        await connection.rollback();
        await connection.end();
        res.status(400).send(error);
    }
};
module.exports = makeBill;
