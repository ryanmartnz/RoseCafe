const router = require("express").Router();
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
    try {
        // Get the entered data from the request body
        const {first_name, last_name, email, phone, password} = req.body;
        
        // Check if the user exists (if the user exists, throw error)
        const doesUserExist = await pool.query("SELECT EXISTS(SELECT * FROM users WHERE user_email = $1)", [email]);

        if(doesUserExist.rows[0].exists === true) {
            return res.status(401).json("User already exists.");
        }

        // Bcrypt the user password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Enter the new user into the database
        const newUser = await pool.query(
            "INSERT INTO users (user_first_name, user_last_name, user_email, user_phone, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [first_name, last_name, email, phone, bcryptPassword]
        );
        delete newUser.rows[0].user_password;

        // Generate the jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);

        const tokenName = `token:${newUser.rows[0].user_first_name}`
        res.cookie(tokenName, token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 15,
        });

        res.json({ success: true });

    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//login route
router.post("/login", validInfo, async (req, res) => {
    try {
        // Get the entered data from the request body
        const { email, password } = req.body;

        // Check if the user doesn't exist (if not, throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        
        if(user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // Check if the entered password is the same as the database password (if not, throw error)
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }
        delete user.rows[0].user_password;

        // Generate the jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        
        const tokenName = `token:${user.rows[0].user_first_name}`
        res.cookie(tokenName, token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 15,
        });

        res.json({ success: true });

    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;