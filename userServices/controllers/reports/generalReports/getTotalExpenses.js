const Axios = require("axios");
const config = require("../../../config/transactionconnect");
const mysql = require("mysql2/promise");

const getTotalExpenses = async (req, res) => {
  const data = req.body;
  const connection = await mysql.createConnection(config);
  try {
    // to get the total expenditure of job and grey
    const expense1 = await connection.execute(
      `SELECT Sum(gb.billAmount) as grey_purchase_expense,SUM(jc.totalamount) as job_send_expenses from job_challans as jc,grey_bills as gb;`,
    );
    
    // to get the total expenditure of mill
    const expense2 = await connection.execute(
        `SELECT SUM(rate*receivedMeters) as mill_expenditure FROM mill_challan_details;`,
      );


    // to get the total expenditure of general purchase
      const expense3 = await connection.execute(
        `SELECT SUM(totalamount) as general_purchase_expense FROM general_purchase;`,
      );

    
    
    

    const ans = {
        grey_purchase_expense : expense1[0][0].grey_purchase_expense,
        job_send_expenses : expense1[0][0].job_send_expenses,
        mill_expenditure: expense2[0][0].mill_expenditure,
        general_purchase_expense : expense3[0][0].general_purchase_expense
    }
    // console.log(ans)
    res.send(ans);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = getTotalExpenses;