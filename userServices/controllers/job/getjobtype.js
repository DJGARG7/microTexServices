const db = require("../../config/db");

const getjobtype = (req, res) => {
    const data = req.body
    console.log("rgrrg");
  db.query(
    "SELECT * FROM job_types;",
    (error,result) => {
      if (error) {
        if (error) res.status(400).send(`${error.sqlMessage}`);
      } else res.send(result);
    }
  );
};

module.exports = getjobtype;
