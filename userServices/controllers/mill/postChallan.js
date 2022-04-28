const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");

const postChallan = async (req, res) => {
    const connection = await mysql.createConnection(config);

    // Begin transaction.
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();

    if (req.params.mode === "send") {
        try {
            // Update GREY_BILL_DETAILS.
            await connection.execute(
                "UPDATE grey_bill_details SET remTaka = remTaka - ?, remMeters = remMeters - ? WHERE billNumber = ?;",
                [
                    req.body.selectedTaka.length,
                    req.body.totalMeters,
                    req.body.billNumber,
                ]
            );

            // Insert into MILL_CHALLAN.
            await connection.execute(
                "INSERT INTO mill_challan VALUES (?, ?, ?, ?, ?, NULL, NULL, 0);",
                [
                    req.body.challanNumber,
                    req.body.billNumber,
                    req.body.millID,
                    req.body.itemID,
                    req.body.challanDate,
                ]
            );

            // Insert into MILL_CHALLAN_DETAILS.
            await connection.execute(
                "INSERT INTO mill_challan_details VALUES (NULL, ?, ?, ?, 0, 0, NULL, NULL, NULL);",
                [
                    req.body.challanNumber,
                    req.body.selectedTaka.length,
                    req.body.totalMeters,
                ]
            );

            // Delete from GREY_TAKA_DETAILS.
            await Promise.all(
                req.body.selectedTaka.map(async (taka) => {
                    await connection.execute(
                        "DELETE FROM grey_taka_details WHERE takaID = ? AND billNumber = ? AND itemID = ?;",
                        [taka.takaID, req.body.billNumber, req.body.itemID]
                    );
                })
            );

            // Insert into MILL_TAKA_DETAILS.
            await Promise.all(
                req.body.selectedTaka.map(async (taka) => {
                    await connection.execute(
                        "INSERT INTO mill_taka_details VALUES(NULL, ?, ?, ?, 1);",
                        [req.body.challanNumber, req.body.itemID, taka.meters]
                    );
                })
            );

            await connection.commit();

            res.send("Sent!");
        } catch (error) {
            connection.rollback();
            console.log(error);
            res.status(400).send(`${error.sqlMessage}`);
        }
    } else if (req.params.mode === "receive") {
        try {
            // Update MILL_CHALLAN.
            await connection.execute(
                "UPDATE mill_challan SET receiveDate = ?, amount = ?, status = 1 WHERE challanNumber = ?;",
                [req.body.receiveDate, req.body.amount, req.body.challanNumber]
            );

            // UPDATE MILL_CHALLAN_DETAILS.
            await connection.execute(
                "UPDATE mill_challan_details SET receivedTaka = ?, receivedMeters = ?, millLoss = ?, pieceLoss = ?, rate = ? WHERE challanNumber = ?;",
                [
                    req.body.receivedTaka,
                    req.body.receivedMeters,
                    req.body.millLoss,
                    req.body.pieceLoss,
                    req.body.rate,
                    req.body.challanNumber,
                ]
            );

            // Update MILL_TAKA_DETAILS.
            await connection.execute(
                "UPDATE mill_taka_details SET isPending = 0 WHERE challanNumber = ? AND itemID = ?;",
                [req.body.challanNumber, req.body.itemID]
            );

            // Insert into INVENTORY.
            await connection.execute(
                "INSERT INTO inventory VALUES (NULL, ?, ?, ?, ?, 0, 0, 0)",
                [
                    req.body.itemID,
                    req.body.itemName,
                    (req.body.receivedMeters - req.body.pieceLoss) / 10,
                    "godown",
                ]
            );

            await connection.commit();

            res.send("Received!");
        } catch (error) {
            connection.rollback();
            console.log(error);
            res.status(400).send(`${error.sqlMessage}`);
        }
    } else {
        res.status(400).send("Bad request");
    }
};

module.exports = postChallan;
