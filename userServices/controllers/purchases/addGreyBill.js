const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");

const addGreyBill = async (req, res) => {
    console.log(req.body);

    const connection = await mysql.createConnection(config);

    // Begin transaction.
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();

    try {
        // Insert into GREY_BILLS.
        await connection.execute(
            "INSERT INTO grey_bills VALUES (?, ?, ?, ?, 1);",
            [
                req.body.formData.billNumber,
                req.body.formData.billDate,
                req.body.formData.accountID,
                req.body.totalamount,
            ]
        );

        // Insert into GREY_BILL_DETAILS.
        await Promise.all(
            req.body.purchaseditems.map(async (item, index) => {
                await connection.execute(
                    "INSERT INTO grey_bill_details VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [
                        req.body.formData.billNumber,
                        item.itemID,
                        item.Taka,
                        item.Mts,
                        item.Taka,
                        item.Mts,
                        item.Rate,
                        item.Amount,
                        item.Discount,
                    ]
                );

                // Insert into GREY_TAKA_DETAILS.
                await Promise.all(
                    req.body.purchaseditems[index].takaList.map(
                        async (taka) => {
                            await connection.execute(
                                "INSERT INTO grey_taka_details VALUES (NULL, ?, ?, ?);",
                                [
                                    req.body.formData.billNumber,
                                    item.itemID,
                                    taka.Mts,
                                ]
                            );
                        }
                    )
                );
            })
        );

        await connection.commit();
        res.send("Saved!");
    } catch (err) {
        console.log(error);
        connection.rollback();
        res.status(500).send("Save failed!");
    }
};

module.exports = addGreyBill;
