const db = require("../../config/db");

const getdistinctitems = (req, res) => {

    const data = req.params
  db.query(
    `SELECT challanNo, challanDate,jobType,Sr_no, itemName,pieces,itemID, jobRate,status,inventoryID
    FROM job_challans NATURAL JOIN job_challan_details INNER JOIN master_account INNER JOIN GREY_ITEMS WHERE 
    job_challans.accountID = master_account.uid AND job_challan_details.greyItemID = GREY_ITEMS.itemID and jobType=? and accountID=? and status="0";`,[data.jobType,data.accountID],
    (error,result) => {
      if (error) {
        if (error) res.status(400).send(`${error.sqlMessage}`);
      } else res.send(result);
    }
  );
};

module.exports = getdistinctitems;
