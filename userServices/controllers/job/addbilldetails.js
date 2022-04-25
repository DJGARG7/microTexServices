const Axios = require("axios");
const config = require("../../config/transactionconnect");
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

const addbilldetails = async (req, res) => {
  const data = req.body;
  const connection = await mysql.createConnection(config);
  await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

  await connection.beginTransaction();

  try {
    await connection.execute(
      "INSERT INTO job_bills values (?,?,?,?);",
      [
        data.state.challanNo,
        data.accountID,
        data.jobtypeID,
        data.state.challanDate,
      ]
    );

    console.log(data)

    await Promise.all(
        data.tabledata.map(async (item, index) => {
            await connection.execute(
                "INSERT INTO job_item_details VALUES (NULL, ?, ?, ?, ?, ?, ?);",
                [
                    data.state.challanNo,
                    item.itemID,
                    item.jobQuality,
                    item.pieces,
                    item.meters,
                    item.jobRate,
                ]
            );
        })
    );

    console.log("done ");

    // const transactData = {
    //   date: data.state.billdate,
    //   uid: data.accntid,
    //   accType: data.accntType,
    //   amt: data.totalamount,
    //   CrDr: data.CrDr,
    //   billno: data.state.billno,
    //   remark: "general purchase",
    // };

    // try {
    //   await Axios.post("http://localhost:3007/transaction/", transactData);
    //   await connection.commit();
    //   res.send(JSON.stringify(ref));
    // } catch (e) {
    //   connection.rollback();
    //   res.send(e);
    // }
    await connection.commit();

    res.send("Bill Successfully added");
  } catch (e) {
    connection.rollback();
    res.status(400).send(`${e.sqlMessage}`);
  }
};

module.exports = addbilldetails;
