const logout = (req, res) => {
    // Remove cookie by expiry.
    res.cookie("accessToken", {
        expires: Date.now(),
    }).json({
        userID: "",
        isLoggedIn: false,
    });
};

module.exports = logout;
