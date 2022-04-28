const db = require("../../config/db");

const getSum = (req, res) => {
    if (!req.params.startDate || !req.params.endDate)
        res.status(400).send("Bad request");
    else {
        console.log("hello");
    }
};

module.exports = getSum;
