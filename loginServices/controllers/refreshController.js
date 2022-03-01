const db = require("../config/db");
const jwt = require("jsonwebtoken");

const refresh = (req, res) => {
    // Access is denied if refresh token is not sent.
    if (!req.cookies.refreshToken) res.status(401).send("Access denied.");

    try {
        // Verify token if it exists.
        const verify = jwt.verify(
            req.cookies.refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // If it checks out, hit the database to see if the token exists.
        db.query(
            "SELECT user_id FROM Proprietor WHERE refresh_token = ?",
            [req.cookies.refreshToken],
            (error, results) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    if (!results)
                        throw { name: "Unauthorized", error: new Error() };

                    // Authorization - check if the token owner & request owner are the same.
                    if (verify._id !== results[0].user_id)
                        res.status(401).send("Invalid token.");
                    else {
                        // Generate new access token.
                        const accessToken = jwt.sign(
                            { _id: req.body.userID },
                            process.env.JWT_ACCESS_SECRET,
                            { expiresIn: "30s" }
                        );

                        // Send access token.
                        res.json({
                            userID: verify._id,
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
