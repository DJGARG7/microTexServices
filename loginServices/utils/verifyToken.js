const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    // Get token from request header.
    const token = req.header("auth-token");

    // Access is denied to resource if token does not exist.
    if (!token) res.status(401).send("Access denied.");

    try {
        // Verify token if it exists.
        const tokenPayload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError")
            res.status(401).send("Invalid token.");
        else if (error.name === "TokenExpiredError")
            res.status(403).send("Token expired.");
    }
};

module.exports = authenticate;
