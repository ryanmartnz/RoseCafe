const router = require("express").Router();
const pool = require("../database/db");

router.get("/hot-breakfast", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products WHERE product_id LIKE 'FHB%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/bakery", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products WHERE product_id LIKE 'FBA%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/lunch", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products WHERE product_id LIKE 'FLU%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;