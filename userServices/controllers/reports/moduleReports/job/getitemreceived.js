const db = require("../../../../config/db");

const getitemreceived = (req, res) => {

    const data = req.params
  db.query(
    `SELECT pieces,itemName FROM job_challan_details NATURAL JOIN job_challans NATURAL JOIN grey_items where status=1 and jobType=? and  grey_items.itemID=job_challan_details.greyItemID GROUP BY itemName;`,[data.jobtype],
    (error,result) => {
      if (error) {
        if (error){
          console.log(error);
          res.status(400).send(`${error.sqlMessage}`)};
      } else {
        res.send(result)}
    }
  );
};

module.exports = getitemreceived;