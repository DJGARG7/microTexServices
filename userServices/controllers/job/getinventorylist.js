const db = require("../../config/db");

const getinventorylist = (req, res) => {
  // For "View Purchases table.

  console.log(req.params);

  db.query(
    `SELECT challanNo,challanDate,jobQuality,itemName,jobItemID,
  pieces,meters,jobRate,greyItemID,jobTypeID FROM job_item_details as jid 
  NATURAL JOIN job_challans INNER JOIN GREY_ITEMS as gi 
  on gi.itemID=jid.greyItemID where accountID=? and status="inventory" and jobTypeId=?
   ORDER BY challanDate,challanNo;`,
    [req.params.accntid, req.params.jobtype],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else res.send(result);
    }
  );
};

module.exports = getinventorylist;
