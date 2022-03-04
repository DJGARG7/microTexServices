const db = require("../config/db");
const jwt = require("jsonwebtoken");

const logout = (req, res) => {
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

            // Remove cookie by expiry.
            res.cookie("accessToken", {
                expires: Date.now(),
            }).json({
                userID: "",
                isLoggedIn: false,
            });
        } catch (error) {
            if (error.name === "JsonWebTokenError" || "UnauthorizedUserError")
                res.status(401).send("Invalid token.");
            else if (error.name === "TokenExpiredError")
                res.status(403).send("Token expired.");
        }
    }
};

module.exports = logout;
