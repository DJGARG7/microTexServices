const Axios = require("axios");
const config = require("../../config/transactionconnect");
const mysql = require("mysql2/promise");

const jobreceiveitems = async (req, res) => {
  const data = req.body;
  const connection = await mysql.createConnection(config);
  await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

  await connection.beginTransaction();
  console.log(data);
  try {
    // to update the status and the receive bill date
    await connection.execute(
      `UPDATE job_challans set status = 1,receiveDate=?,totalamount=? WHERE challanNo=?`,
      [data.billdate, data.totalamount, data.challannumber]
    );

    await Promise.all(
      data.receivedItems.map(async (item, index) => {
        // to upadte the inventory table and subtract the pieces sent
        await connection.execute(
          `UPDATE inventory SET pieces = pieces - ? where InventoryID = ?;`,
          [item.pieces, item.inventoryID]
        );

        // for fetching the stone and lace work details
        const types = await connection.execute(
          `SELECT * FROM inventory where InventoryID=?`,
          [item.inventoryID]
        );

        const l = types[0][0].Lace;
        const s = types[0][0].Stone;
        const e = types[0][0].Embroidery;

        // create a new entry in invetory or add to a exsisting one
        if (item.jobType === "Embroidery") {
          const exist = await connection.execute(
            `select exists(select * from inventory where itemID=? and status="godown" and Embroidery=1 and Lace=? and Stone=?) as ans`,
            [item.itemID, l, s]
          );

          if (exist[0][0].ans) {
            await connection.execute(
              `update inventory set pieces = pieces + ? where itemID=? and status="godown" and Embroidery=1 and Lace=? and Stone=?`,
              [item.pieces, item.itemID, l, s]
            );
          } else {
            await connection.execute(
              `INSERT INTO inventory VALUES (NULL,?,?,?,"godown",1,?,?)`,
              [item.itemID, item.itemName, item.pieces, s, l]
            );
          }
        } else if (item.jobType === "Stone") {
          const exist = await connection.execute(
            `select exists(select * from inventory where itemID=? and status="godown" and Embroidery=? and Lace=? and Stone=1) as ans`,
            [item.itemID, e, l]
          );

          if (exist[0][0].ans) {
            await connection.execute(
              `update inventory set pieces = pieces + ? where itemID=? and status="godown" and Embroidery=? and Lace=? and Stone=1`,
              [item.pieces, item.itemID, e, l]
            );
          } else {
            await connection.execute(
              `INSERT INTO inventory VALUES (NULL,?,?,?,"godown",?,1,?)`,
              [item.itemID, item.itemName, item.pieces, e, l]
            );
          }
        } else if (item.jobType === "Lace") {
          const exist = await connection.execute(
            `select exists(select * from inventory where itemID=? and status="godown" and Embroidery=? and Lace=1 and Stone=?) as ans`,
            [item.itemID, e, s]
          );
          if (exist[0][0].ans) {
            await connection.execute(
              `update inventory set pieces = pieces + ? where itemID=? and status="godown" and Embroidery=? and Lace=1 and Stone=?`,
              [item.pieces, item.itemID, e, s]
            );
          } else {
            await connection.execute(
              `INSERT INTO inventory VALUES (NULL,?,?,?,"godown",?,?,1)`,
              [item.itemID, item.itemName, item.pieces, e, s]
            );
          }
        }
      })
    );

    const transactData = {
      date: data.billdate,
      uid: data.accountID,
      accType: "Creditors For Job",
      amt: data.totalamount,
      CrDr: "Cr",
      billno: data.challannumber,
      remark: "Job purchases",
    };
    
    await Axios.post("http://localhost:3007/transaction/", transactData);


    await connection.commit();
    res.send("Items received Successfully");
  } catch (e) {
    await connection.rollback();
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = jobreceiveitems;

/*
accntname: 'Accnt for Job send',
billdate: '2022-04-29',
challannumber: 6354,
totalamount: 10578,
receivedItems: [
  {
    challanNo: 6354,
    challanDate: '29/04/2022',
    jobType: 'Embroidery',
    Sr_no: 109,
    itemName: 'Chiffon',
    pieces: 43,
    jobRate: 123,
    status: 0,
    inventoryID: 21
  },
  {
    challanNo: 6354,
    challanDate: '29/04/2022',
    jobType: 'Embroidery',
    Sr_no: 110,
    itemName: 'Saree',
    pieces: 43,
    jobRate: 123,
    status: 0,
    inventoryID: 18
  }
]
}
*/
