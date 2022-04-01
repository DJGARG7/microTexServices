const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const addBilldetails = async (req, res) => {
    const data = req.body;
    const ref = {
        status: "1",
    };
    const connection = await mysql.createConnection(config);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    await connection.beginTransaction();

    try {
        // insert into bill details
        await connection.execute(
            "INSERT INTO billdetails VALUES (?,?,?,?,?,?,?,?);",
            [
                data.state.BillNo,
                data.state.BillDate,
                data.state.accntnames,
                data.state.ChallanNo,
                data.state.ChallanDate,
                data.state.Agent,
                data.state.EntryNo,
                data.totalamount,
            ]
        );
        console.log("Bill details added successfully");
        let count = 0;
        data.purchaseditems.forEach(async (item, index) => {
            try {
                await connection.execute(
                    "INSERT INTO itemdetails values (?,?,?,?,?,?,?,?,?,?,?,?,?);",
                    [
                        data.state.BillNo,
                        item.ItemName,
                        item.Marka,
                        item.Taka,
                        item.Mts,
                        item.Fold,
                        item.ActMts,
                        item.Rate,
                        item.Amount,
                        item.Discount,
                        item.IGST,
                        item.CGST,
                        item.SGST,
                    ]
                );
                console.log("item details added successfully");
                count++;
                if (count === data.purchaseditems.length) {
                    await connection.commit();
                    console.log("transaction completed");
                    res.send(JSON.stringify(ref));
                }
            } catch (e) {
                console.log("in item detial block", e);
                connection.rollback();
                res.send(e);
            }
        });
    } catch (err) {
        console.log("in bill detial block", err);
        connection.rollback();
        res.send(err);
    }
};

module.exports = addBilldetails;
