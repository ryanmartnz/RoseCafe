const router = require("express").Router();
const pool = require("../database/db");

router.get("/hot-coffees", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id LIKE 'DHC%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/cold-coffees", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id LIKE 'DCC%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/sparklers", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id LIKE 'DSP%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/frozen-coffees", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id LIKE 'DFC%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/hot-teas", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id LIKE 'DHT%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/iced-teas", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id LIKE 'DIT%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/milk-juice", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id LIKE 'DMJ%'");
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;