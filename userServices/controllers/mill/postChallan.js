const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");

const postChallan = async (req, res) => {
    console.log(req.body);

    const connection = await mysql.createConnection(config);

    // Begin transaction.
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();

    try {
        // Insert into MILL_CHALLAN.
        await connection.execute(
            "INSERT INTO MILL_CHALLAN VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [
                req.body.challanNumber,
                req.body.challanDate,
                req.body.supplierID,
                req.body.itemID,
                req.body.millID,
                req.body.totalMeters,
                req.body.selectedTaka.length,
                req.body.totalMeters,
                req.body.selectedTaka.length,
            ]
        );

        console.log("Challan added to MILL_CHALLAN.");

        // Delete from GREY_TAKA_DETAILS.
        await Promise.all(
            req.body.selectedTaka.map(async (taka) => {
                await connection.execute(
                    "DELETE FROM GREY_TAKA_DETAILS WHERE takaID = ? AND billNumber = ? AND itemID = ?;",
                    [taka.takaID, req.body.billNumber, req.body.itemID]
                );

                console.log("Taka deleted from GREY_TAKA_DETAILS.");
            })
        );

        console.log("All taka deleted from GREY_TAKA_DETAILS.");

        // Insert into MILL_TAKA_DETAILS.
        await Promise.all(
            req.body.selectedTaka.map(async (taka) => {
                await connection.execute(
                    "INSERT INTO MILL_TAKA_DETAILS VALUES(NULL, ?, ?, ?, 1);",
                    [req.body.challanNumber, req.body.itemID, taka.meters]
                );

                console.log("Taka inserted to MILL_TAKA_DETAILS.");
            })
        );

        console.log("All taka inserted to MILL_TAKA_DETAILS.");

        await connection.commit();

        console.log("Transaction complete.");

        res.send("Sent!");
    } catch (error) {
        connection.rollback();
        res.status(400).send(`${error.sqlMessage}`);
    }
};

module.exports = postChallan;
