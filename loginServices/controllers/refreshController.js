const jwt = require("jsonwebtoken");

const refresh = (req, res) => {
    console.log(req.cookies.refreshToken);
    res.send("Hello");
};

module.exports = refresh;
