const Axios = require("axios");
const config = require("../../../config/transactionconnect");
const mysql = require("mysql2/promise");

const getItemSold = async (req, res) => {
  const data = req.body;
  const connection = await mysql.createConnection(config);
  try {
    // to get the total expenditure of job and grey
    const itemsbought = await connection.execute(
      `SELECT SUM(QTY) as total_pcs, Type from sales_order_details GROUP BY TYPE;`,
    );
    res.send(itemsbought[0]);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = getItemSold;