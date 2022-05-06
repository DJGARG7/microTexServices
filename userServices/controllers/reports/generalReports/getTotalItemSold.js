const Axios = require("axios");
const config = require("../../../config/transactionconnect");
const mysql = require("mysql2/promise");

const getTotalItemSold = async (req, res) => {
  const data = req.body;
  const connection = await mysql.createConnection(config);
  try {
    // to get the total expenditure of job and grey
    const itemsbought = await connection.execute(
      `SELECT SUM(meters) as total_meters,itemID,itemName from grey_bill_details NATURAL JOIN grey_items GROUP BY itemID;`,
    );

    console.log(itemsbought[0])
    res.send(itemsbought[0]);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = getTotalItemSold;