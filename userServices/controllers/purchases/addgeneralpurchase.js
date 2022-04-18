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

    try {
      await connection.execute("");
    } catch (e) {
      console.log("error while adding data to transaction table ", e);
      res.send(e);
    }



  } catch (e) {
    console.log("Error occured while adding data in generalpurchase table ", e);
    connection.rollback();
    res.send(e);
  }



};

module.exports = addgeneralpurchase;
