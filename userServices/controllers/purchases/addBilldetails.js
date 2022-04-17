const mysql = require("mysql2/promise");
const config = require("../../config/transactionconnect");

const { v4: uuidv4 } = require("uuid");

const addBilldetails = async (req, res) => {
    console.log(req.body);

    const data = req.body;

    const ref = {
        status: "1",
    };

    const connection = await mysql.createConnection(config);

    // Begin transaction.
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await connection.beginTransaction();

    try {
        // Insert into GREY_BILLS.
        await connection.execute(
            "INSERT INTO GREY_BILLS VALUES (?, ?, ?, ?);",
            [
                data.formData.billNumber,
                data.formData.billDate,
                data.formData.accountID,
                data.totalamount,
            ]
        );
        console.log("Bill added successfully.");

        // Insert into GREY_BILL_DETAILS.
        console.log(data.purchaseditems);
        await Promise.all(
            data.purchaseditems.map(async (item, index) => {
                console.log(`DISCOUNT: ${item.Discount}`);
                console.log(parseFloat(item.Discount));
                await connection.execute(
                    "INSERT INTO GREY_BILL_DETAILS VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);",
                    [
                        data.formData.billNumber,
                        item.itemID,
                        item.Taka,
                        item.Mts,
                        item.Rate,
                        item.Amount,
                        item.Discount,
                    ]
                );
                console.log("Bill details added successfully.");

                // Insert into GREY_TAKA_DETAILS.
                await Promise.all(
                    data.purchaseditems[index].takaList.map(async (taka) => {
                        await connection.execute(
                            "INSERT INTO GREY_TAKA_DETAILS VALUES (NULL, ?, ?, ?, ?);",
                            [
                                data.formData.billNumber,
                                data.formData.accountID,
                                item.itemID,
                                taka.Mts,
                            ]
                        );
                    })
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
