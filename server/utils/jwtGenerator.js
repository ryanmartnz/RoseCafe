const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.MY_SECRET, {expiresIn: "1hr"});
};

module.exports = jwtGenerator;