const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");
const validation = require("../utils/validation");

const login = (req, res) => {
    if (req.body.userType === "proprietor") {
        // Validate incoming request.
        const { error } = validation.validateLoginProprietor(req.body);

        // If there is an error, report it; else continue normal flow.
        if (error) return res.status(400).send(error.details[0].message);

        db.query(
            "SELECT * FROM Proprietor WHERE user_id = ?",
            [req.body.userID],
            (error, results) => {
                if (error)
                    res.status(401).send("userID or password is incorrect.");

                // Check if userID exists; if it exists check if it is correct; then check if password is correct.
                if (
                    !results ||
                    results.length == 0 ||
                    results[0].user_id !== req.body.userID ||
                    !bcrypt.compareSync(req.body.password, results[0].password)
                ) {
                    res.status(401).send("userID or password is incorrect.");
                } else {
                    // Create access token.
                    const accessToken = jwt.sign(
                        { userID: req.body.userID, userType: "Proprietor" },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h" }
                    );

                    // Send JWT.
                    res.cookie("accessToken", accessToken, {
                        maxAge: 24 * 3600000,
                        httpOnly: true,
                        signed: true,
                    }).json({
                        uuid: results[0].uuid,
                        userID: req.body.userID,
                        userName: results[0].user_name,
                        accessToken: accessToken,
                        isLoggedIn: true,
                    });
                }
            }
        );
    } else if (req.body.userType === "firm") {
        // Validate incoming request.
        const { error } = validation.validateLoginFirm(req.body);

        // If there is an error, report it; else continue normal flow.
        if (error) return res.status(401).send(error.details[0].message);

        db.query(
            "SELECT * FROM Firm WHERE user_id = ?",
            [req.body.userID],
            (error, results) => {
                if (error)
                    res.status(401).send(
                        "corporateID, userID or password is incorrect."
                    );

                // Check if userID exists; if it exists check if userID exists; if it exists check if it is correct; then check if password is correct.
                if (
                    !results ||
                    results.length == 0 ||
                    results[0].corporate_id !== req.body.corporateID ||
                    results[0].user_id !== req.body.userID ||
                    !bcrypt.compareSync(req.body.password, results[0].password)
                ) {
                    res.status(401).send(
                        "corporateID, userID or password is incorrect."
                    );
                } else {
                    // Create access token.
                    const accessToken = jwt.sign(
                        { userID: req.body.userID, userType: "Firm" },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h" }
                    );

                    // Send JWT.
                    res.cookie("accessToken", accessToken, {
                        maxAge: 24 * 3600000,
                        httpOnly: true,
                        signed: true,
                    }).json({
                        uuid: results[0].uuid,
                        userID: req.body.userID,
                        userName: results[0].user_name,
                        accessToken: accessToken,
                        isLoggedIn: true,
                    });
                }
            }
        );
    }
};

module.exports = login;
