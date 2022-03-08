const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    // Access is denied if access token is not sent.
    if (!req.signedCookies.accessToken) res.status(401).send("Access denied.");
    else {
        try {
            // Validate token if it exists.
            const tokenPayload = jwt.verify(
                req.signedCookies.accessToken,
                process.env.JWT_SECRET
            );

            // Check if token belongs to user.
            if (req.header("userID") !== tokenPayload.userID)
                throw { name: "UnauthorizedUserError", error: new Error() };

            next();
        } catch (error) {
            if (error.name === "JsonWebTokenError")
                res.status(400).send("Invalid token.");
            else if (error.name === "UnauthorizedUserError")
                res.status(401).send("Unauthorized.");
            else if (error.name === "TokenExpiredError")
                res.status(403).send("Token expired.");
        }
    }
};

module.exports = authenticate;
