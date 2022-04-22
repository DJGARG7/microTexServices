const db = require("../../config/db");

const addjobtype = (req, res) => {
    const data = req.body
  db.query(
    "INSERT INTO job_types VALUES (NULL,?);",
    [data.jobtype],
    (error) => {
      if (error) {
        if (error) res.status(400).send(`${error.sqlMessage}`);
      } else res.send("Job Type added successfully!");
    }
  );
};

module.exports = addjobtype;
