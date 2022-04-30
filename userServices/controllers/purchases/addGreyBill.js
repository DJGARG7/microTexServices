const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");
const axios = require("axios");

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

        // Add transaction.
        const transactData = {
            date: req.body.formData.billDate,
            uid: req.body.formData.accountID,
            accType: "Sundry Creditors",
            amt: req.body.totalamount,
            CrDr: "Cr",
            billno: req.body.formData.billNumber,
            remark: "Grey Purchase",
        };

        await axios.post("http://localhost:3007/transaction/", transactData);

        await connection.commit();
        await connection.end();

        res.send("Saved!");
    } catch (err) {
        await connection.rollback();
        await connection.end();
        console.log(error);

        res.status(500).send("Save failed!");
    }
};

module.exports = addGreyBill;
