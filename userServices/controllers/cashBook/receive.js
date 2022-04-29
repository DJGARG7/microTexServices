//  3005/cashbook/receive
const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const receive = async (req, res) => {
    const data = req.body;
    console.log(data);
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();
    try {
        const query1 = "";
        await connection.execute(query1, []);
        // if mysql lock error, add commit here
        //prepare data for transaction service
        try {
            //axios request to transaction service
        } catch (e) {
            //transaction service failed to transact
            // compensating code
            //
        }
    } catch (e) {}
};
module.exports = receive;

//update sales_order status=2
// add transaction
//if transaction fails...set status back to 1
