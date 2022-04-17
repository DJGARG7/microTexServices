const db = require("../config/db");

const GetNameType = (req, res) => {
    console.log(req.body);
    const data = {};
    const query =
<<<<<<< HEAD
        "SELECT distinct(name) FROM DesignMaster;SELECT distinct(cloth_Type) FROM DesignMaster;";
=======
        "SELECT distinct(name) FROM master_design;SELECT distinct(cloth_Type) FROM master_design;";
>>>>>>> 7a9d93c867a16f13832d297245b70bc8b15ea1f9
    db.query(query, (err, result) => {
        if (err) res.status(400).send(err);
        else res.send(result);
    });

    // db.query
};

module.exports = GetNameType;
