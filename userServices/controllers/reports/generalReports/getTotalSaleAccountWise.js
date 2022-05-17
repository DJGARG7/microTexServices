const Axios = require("axios");
const config = require("../../../config/transactionconnect");
const mysql = require("mysql2/promise");

const getTotalSaleAccountWise = async (req, res) => {
  const data = req.body;
  const connection = await mysql.createConnection(config);
  try {
    // to get the total expenditure of job and grey
    const saleaccountwise = await connection.execute(
      `SELECT CNAME,SUM(QTY*RATE) as amount FROM sales_order NATURAL JOIN sales_order_details GROUP BY CNAME;`,
    );
    res.send(saleaccountwise[0]);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = getTotalSaleAccountWise;