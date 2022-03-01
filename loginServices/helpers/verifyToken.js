const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    // Get token from request header.
    const token = req.header("auth-token");

    // Access is denied to resource if token does not exist.
    if (!token) res.status(401).send("Access denied.");

    // Verify token if it exists.
    try {
        const verify = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Authorization - check if the token owner & request owner are the same.
        if (verify._id === req.body.userID)
            throw { name: "Unauthorized", error: new Error() };

        next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "Unauthorized"
        ) {
            res.status(401).send("Invalid token.");
        } else if (error.name === "TokenExpiredError") {
            res.status(403).send("Token expired.");
        }
    }
};

module.exports = authenticate;
