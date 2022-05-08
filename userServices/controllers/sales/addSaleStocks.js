const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const addSaleStocks = async (req, res) => {
    const data = req.body;
    console.log(data);
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();
    try {
        await connection.execute("update master_design set qty=qty+? where NAME = ?",[data.num,data.DName]); // add to  design master stock
        await connection.execute("update inventory set pieces=pieces-? where InventoryID = ?",[data.num,data.inventoryID]); // reduce from inventory stock
        await connection.commit();
        res.send("1");
    } catch (error) {
        console.log("addSaleStocks failed due to  ", error);
        connection.rollback();
        res.status(400).send(error);
    }
};
module.exports = addSaleStocks;
