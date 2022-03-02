const db = require("../config/db");
const jwt = require("jsonwebtoken");

const logout = (req, res) => {
    // Access is denied if refresh token is not sent.
    if (!req.cookies.refreshToken) res.status(401).send("Access denied.");
    else {
        try {
            // Verify token if it exists.
            const tokenPayload = jwt.verify(
                req.cookies.refreshToken,
                process.env.JWT_REFRESH_SECRET
            );

            // Remove token from database.
            db.query(
                `UPDATE ${tokenPayload.userType} SET refresh_token = NULL WHERE refresh_token = ?`,
                [req.cookies.refreshToken],
                (error) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        // Send JWT.
                        res.cookie("refreshToken", {
                            expires: Date.now(),
                        }).send("Logout sucessfull");
                    }
                }
            );
        } catch (error) {
            if (error.name === "JsonWebTokenError")
                res.status(401).send("Invalid token.");
            else if (error.name === "TokenExpiredError")
                res.status(403).send("Token expired.");
        }
    }
};

module.exports = logout;
