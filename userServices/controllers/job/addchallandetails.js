const Axios = require("axios");
const config = require("../../config/transactionconnect");
const mysql = require("mysql2/promise");

const challandetails = async (req, res) => {
  const data = req.body;
  const connection = await mysql.createConnection(config);
  await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

  await connection.beginTransaction();
  try {
    await connection.execute(`INSERT INTO job_challans values (?,?,?,?,0,NULL,NULL);`, [
      data.challandetails.challanNo,
      data.accountID,
      data.challandetails.jobType,
      data.challandetails.challanDate,
    ]);

    await Promise.all(
      data.sendjobitemslist.map(async (item, index) => {
        let inID;
        await connection.execute(
          `UPDATE inventory SET pieces = pieces - ? where InventoryID = ?;`,
          [item.pieces, item.inventoryID]
        );

        if (data.challandetails.jobType === "Embroidery") {
          const exist = await connection.execute(
            `select exists(select * from inventory where itemID=? and status="Embroidery" and Embroidery=? and Lace=? and Stone=?) as ans`,
            [item.itemID, item.em, item.la, item.st]
          );

          if (exist[0][0].ans) {
            await connection.execute(
              `update inventory set pieces = pieces + ? where itemID=? and status="Embroidery" and Embroidery=? and Lace=? and Stone=?`,
              [item.pieces, item.itemID, item.em, item.la, item.st]
            );
            const res = await connection.execute(
              `SELECT InventoryID from inventory where itemID=? and status="Embroidery" and Embroidery=? and Lace=? and Stone=?`,
              [item.itemID, item.em, item.la, item.st]
            );
            console.log(res[0][0].InventoryID);
            inID = res[0][0].InventoryID;
          } else {
            await connection.execute(
              `INSERT INTO inventory VALUES (NULL,?,?,?,"Embroidery",?,?,?)`,
              [
                item.itemID,
                item.ItemName,
                item.pieces,
                item.em,
                item.st,
                item.la,
              ]
            );
            const res = await connection.execute(
              `SELECT InventoryID from inventory where itemID=? and status="Embroidery" and Embroidery=? and Lace=? and Stone=?`,
              [item.itemID, item.em, item.la, item.st]
            );
            console.log(res.InventoryID);
            inID = res[0][0].InventoryID;
          }
        } else if (data.challandetails.jobType === "Stone") {
          const exist = await connection.execute(
            `select exists(select * from inventory where itemID=? and status="Stone" and Embroidery=? and Lace=? and Stone=?) as ans`,
            [item.itemID, item.em, item.la, item.st]
          );

          if (exist[0][0].ans) {
            await connection.execute(
              `update inventory set pieces = pieces + ? where itemID=? and status="Stone" and Embroidery=? and Lace=? and Stone=?`,
              [item.pieces, item.itemID, item.em, item.la, item.st]
            );
            const res = await connection.execute(
              `SELECT InventoryID from inventory where itemID=? and status="Stone" and Embroidery=? and Lace=? and Stone=?`,
              [item.itemID, item.em, item.la, item.st]
            );

            // console.log(res.InventoryID);
            inID = res[0][0].InventoryID;
          } else {
            await connection.execute(
              `INSERT INTO inventory VALUES (NULL,?,?,?,"Stone",?,?,?)`,
              [
                item.itemID,
                item.ItemName,
                item.pieces,
                item.em,
                item.st,
                item.la,
              ]
            );
            const res = await connection.execute(
              `SELECT InventoryID from inventory where itemID=? and status="Stone" and Embroidery=? and Lace=? and Stone=?`,
              [item.itemID, item.em, item.la, item.st]
            );
            // console.log(res.InventoryID);
            inID = res[0][0].InventoryID;
          }
        } else if (data.challandetails.jobType === "Lace") {
          const exist = await connection.execute(
            `select exists(select * from inventory where itemID=? and status="Lace" and Embroidery=? and Lace=? and Stone=?) as ans`,
            [item.itemID, item.em, item.la, item.st]
          );
          if (exist[0][0].ans) {
            await connection.execute(
              `update inventory set pieces = pieces + ? where itemID=? and status="Lace" and Embroidery=? and Lace=? and Stone=?`,
              [item.pieces, item.itemID, item.em, item.la, item.st]
            );
            const res = await connection.execute(
              `SELECT InventoryID from inventory where itemID=? and status="Lace" and Embroidery=? and Lace=? and Stone=?`,
              [item.itemID, item.em, item.la, item.st]
            );
            // console.log(res.InventoryID);
            inID = res[0][0].InventoryID;
          } else {
            await connection.execute(
              `INSERT INTO inventory VALUES (NULL,?,?,?,"Lace",?,?,?)`,
              [
                item.itemID,
                item.ItemName,
                item.pieces,
                item.em,
                item.st,
                item.la,
              ]
            );
            const res = await connection.execute(
              `SELECT InventoryID from inventory where itemID=? and status="Lace" and Embroidery=? and Lace=? and Stone=?`,
              [item.itemID, item.em, item.la, item.st]
            );
            // console.log(res.InventoryID);
            inID = res[0][0].InventoryID;
          }
        }

        // inserting into the job_deatils_tables the challan details with inventory id

        await connection.execute(
          "INSERT INTO job_challan_details VALUES (NULL, ?, ?, ?, ?, ?);",
          [
            data.challandetails.challanNo,
            item.itemID,
            item.pieces,
            item.jobRate,
            inID,
          ]
        );
      })
    );

    // const transactData = {
    //   date: data.state.billdate,
    //   uid: data.accntid,
    //   accType: data.accntType,
    //   amt: data.totalamount,
    //   CrDr: data.CrDr,
    //   billno: data.state.billno,
    //   remark: "general purchase",
    // };

    // try {
    //   await Axios.post("http://localhost:3007/transaction/", transactData);
    //   await connection.commit();
    //   res.send(JSON.stringify(ref));
    // } catch (e) {
    //   connection.rollback();
    //   res.send(e);
    // }

    await connection.commit();
    res.send("Bill Successfully added");
  } catch (e) {
    connection.rollback();
    console.log(e);
    res.status(400).send(`${e.sqlMessage}`);
  }
};

module.exports = challandetails;
