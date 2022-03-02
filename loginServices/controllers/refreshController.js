const db = require("../config/db");
const jwt = require("jsonwebtoken");

const refresh = (req, res) => {
    // Access is denied if refresh token is not sent.
    if (!req.cookies.refreshToken) res.status(401).send("Access denied.");

    try {
        // Verify token if it exists.
        const tokenPayload = jwt.verify(
            req.cookies.refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // If it checks out, hit the database to see if the token exists.
        db.query(
            `SELECT user_id FROM ${tokenPayload.userType} WHERE refresh_token = ?`,
            [req.cookies.refreshToken],
            (error, results) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    if (!results)
                        throw { name: "Unauthorized", error: new Error() };

                    // Authorization - check if the token owner & request owner are the same.
                    if (tokenPayload._id !== results[0].user_id)
                        res.status(401).send("Invalid token.");
                    else {
                        // Generate new access token.
                        const accessToken = jwt.sign(
                            {
                                _id: tokenPayload._id,
                                userType: tokenPayload.userType,
                            },
                            process.env.JWT_ACCESS_SECRET,
                            { expiresIn: "60s" }
                        );

                        // Send access token.
                        res.json({
                            userID: tokenPayload._id,
                            accessToken: accessToken,
                        });
                    }
                }
            }
        );
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            res.status(401).send("Invalid token.");
            // Redirect to login
        } else if (error.name === "TokenExpiredError") {
            res.status(403).send("Token expired.");
            // Redirect to login.
        }
    }
};

module.exports = refresh;
