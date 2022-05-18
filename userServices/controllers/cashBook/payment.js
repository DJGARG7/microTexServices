//  3005/cashbook/payment
const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const Axios = require("axios");
const payment = async (req, res) => {
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
    // grey_bills -> sundry creditors , billNumber , status
    // job_challans -> creditor for job, challanNo , status
    // mill_challan -> creditor for process, challanNumber , status
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();
    try {
        //query to update status in correct table
        var query;
        if (data.accType == "Sundry Creditors") {
            query = `update grey_bills set status = 2 where billNumber IN (${data.remark})`;
        } else if (data.accType == "Creditors For Job") {
            query = `update job_challans set status = 2 where challanNo IN (${data.remark})`;
        } else if (data.accType == "Creditors for process") {
            query = `update mill_challan set status = 2 where challanNumber IN (${data.remark})`;
        } else {
            throw "payment failed";
        }
        console.log(query);
        await connection.execute(query);
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
module.exports = payment;
