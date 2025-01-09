const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        // Get jwt token from request headers (if no token provided, throw error)
        const jwtToken = req.cookies.token;
        if(!jwtToken) {
            return res.status(403).json("Not Authorized");
        }
        
        const payload = jwt.verify(jwtToken, process.env.MY_SECRET);
        req.user = payload.user;
        next();
    } catch(err) {
        res.clearCookie("token");
        console.error(err.message);
        return res.status(403).json("Not Authorized");
    }
};