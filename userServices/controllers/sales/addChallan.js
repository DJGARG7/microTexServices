const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const addChallan = async (req, res) => {
    const data = req.body;
    console.log(data);
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();
    try {
        await connection.execute(
            "INSERT INTO SALES_ORDER values (?,?,?,0);",
            data.slice(0, 3)
        );
        await Promise.all(
            data[3].map(async (sale_item) => {
                await connection.execute(
                    "INSERT INTO SALES_ORDER_DETAILS values (?,?,?,?,?);",
                    [
                        data[0],
                        sale_item.DName,
                        sale_item.quantity,
                        sale_item.rate,
                        sale_item.clothType,
                    ]
                );
                await connection.execute(
                    "update master_design set qty=qty-? where NAME = ?",
                    [sale_item.quantity, sale_item.DName]
                );
            })
        );
        await connection.commit();
        res.send("1");
    } catch (error) {
        console.log("transaction failed due to  ", error);
        connection.rollback();
        res.status(400).send(error);
    }
};
module.exports = addChallan;
