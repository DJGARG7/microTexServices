const logout = (req, res) => {
    res.cookie("refreshToken", { expires: Date.now() }).send("Logout");
};

module.exports = logout;
