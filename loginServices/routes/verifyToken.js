const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    // Get token from request header.
    const token = req.header("auth-token");

    // Access is denied to resource if token does not exist.
    if (!token) res.status(401).send("Access denied.");

    // Verify token if it exists.
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        req.isAuthenticated = true;
        next();
    } catch (error) {
        res.status(401).send("Invalid token.");
    }
};

module.exports = authenticate;
