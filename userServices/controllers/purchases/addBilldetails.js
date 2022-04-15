const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const { v4: uuidv4 } = require("uuid");
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
            "INSERT INTO grey_billdetails VALUES (?,?,?,?,?,?);",
            [
                data.state.BillNo,
                data.state.BillDate,
                data.state.accntnames,
                data.state.ChallanNo,
                data.state.ChallanDate,
                data.totalamount,
            ]
        );
        console.log("Bill details added successfully");
        console.log(data.purchaseditems);
        await Promise.all(
            data.purchaseditems.map(async (item, index) => {
                const itemId = uuidv4();
                await connection.execute(
                    "INSERT INTO grey_itemdetails VALUES (?,?,?,?,?,?,?,?,?);",
                    [
                        data.state.ChallanNo,
                        itemId,
                        item.ItemName,
                        item.Taka,
                        item.Mts,
                        item.Mts,
                        item.Rate,
                        item.Amount,
                        item.Discount,
                    ]
                );
                console.log("item details added successfully");
                await Promise.all(
                    data.purchaseditems[index].takaList.map(
                        async (item1, index) => {
                            await connection.execute(
                                "INSERT INTO grey_takadetails VALUES (NULL,?,?);",
                                [itemId, item1.Mts]
                            );
                        }
                    )
                );
            })
        );
        await connection.commit();
        console.log("Transaction Completed");
        res.send(JSON.stringify(ref));
    } catch (err) {
        console.log("in bill detial block", err);
        connection.rollback();
        res.send(err);
    }
};

module.exports = addBilldetails;
