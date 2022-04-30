//  3005/cashbook/receive
const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const Axios = require("axios");
const receive = async (req, res) => {
    const data = req.body;
    console.log(data);
    // const data = {
    //     date: "",
    //     uid: "",
    //     accType: "",
    //     amt: "",
    //     CrDr: "",
    //     billno: "-1",
    //     remark: "1,2",
    // };
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();
    try {
        const query1 = `update sales_order set status = 2 where BILL_NO IN (${data.remark})`; //update sales_order status=2
        await connection.execute(query1);
        await Axios.post("http://localhost:3007/transaction/", data);
        await connection.commit();
        await connection.end();
        res.send("1");
    } catch (e) {
        console.log("testing failed due to  ", e);
        await connection.rollback();
        await connection.end();
        res.status(400).send(e);
    }
};
module.exports = receive;
