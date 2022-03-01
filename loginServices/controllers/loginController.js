const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");
const validation = require("../helpers/validation");

const login = (req, res) => {
    if (req.body.userType === "proprietor") {
        // Validate incoming request.
        const { error } = validation.validateProprietor(req.body);

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
                    results[0].user_id !== req.body.userID ||
                    !bcrypt.compareSync(req.body.password, results[0].password)
                ) {
                    res.status(401).send("userID or password is incorrect.");
                } else {
                    // Create JWT.
                    const accessToken = jwt.sign(
                        { _id: req.body.userID },
                        process.env.JWT_ACCESS_SECRET,
                        { expiresIn: "30s" }
                    );

                    // Send JWT.
                    res.json({
                        userID: req.body.userID,
                        accessToken: accessToken,
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
            "SELECT * FROM Firm WHERE corporate_id = ?",
            [req.body.corporateID],
            (error, results) => {
                if (error)
                    res.status(401).send(
                        "corporateID, userID or password is incorrect."
                    );

                // Check if userID exists; if it exists check if userID exists; if it exists check if it is correct; then check if password is correct.
                if (
                    !results ||
                    results[0].corporate_id !== req.body.corporateID ||
                    results[0].user_id !== req.body.userID ||
                    !bcrypt.compareSync(req.body.password, results[0].password)
                ) {
                    res.status(401).send(
                        "corporateID, userID or password is incorrect."
                    );
                } else {
                    // Create JWT.
                    const accessToken = jwt.sign(
                        { _id: req.body.userID },
                        process.env.JWT_ACCESS_SECRET,
                        { expiresIn: "24h" }
                    );

                    // Send JWT.
                    res.json({
                        userID: req.body.userID,
                        accessToken: token,
                    });
                }
            }
        );
    }
};

module.exports = login;
