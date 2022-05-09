const Axios = require("axios");
const config = require("../../../config/transactionconnect");
const mysql = require("mysql2/promise");

const getTotalAccountExpense = async (req, res) => {
    const data = req.body;
    const connection = await mysql.createConnection(config);
    try {
        // to get the account name and amount of expense paid to it
        const accountWiseExpense = await connection.execute(
            `SELECT * FROM (SELECT SUM(amount) as total,uid from transactions group by uid) temp_table where total>0;`
        );
        console.log(accountWiseExpense[0]);
        res.send(accountWiseExpense[0]);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

module.exports = getTotalAccountExpense;
