const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    // Access is denied to resource if token does not exist.
    if (!req.signedCookies.accessToken) res.status(401).send("Access denied.");
    try {
        // Verify token if it exists.
        const tokenPayload = jwt.verify(
            req.signedCookies.accessToken,
            process.env.JWT_SECRET
        );

        if (req.header("userID") !== tokenPayload.userID)
            throw { name: "UnauthorizedUserError", error: new Error() };

        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || "UnauthorizedUserError")
            res.status(401).send("Invalid token.");
        else if (error.name === "TokenExpiredError")
            res.status(403).send("Token expired.");
    }
};

module.exports = authenticate;
