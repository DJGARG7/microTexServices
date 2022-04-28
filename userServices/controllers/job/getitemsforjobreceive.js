const db = require("../../config/db");

const getdistinctitems = (req, res) => {

    const data = req.params
  db.query(
    `SELECT * FROM job_challans natural join job_challan_details where jobType=?;`,[data.status],
    (error,result) => {
      if (error) {
        if (error) res.status(400).send(`${error.sqlMessage}`);
      } else res.send(result);
    }
  );
};

module.exports = getdistinctitems;
