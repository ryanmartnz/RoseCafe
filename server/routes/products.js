const router = require("express").Router();
const pool = require("../database/db");

router.get("/:productId", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM products WHERE product_id = $1", [req.params.productId]);
        if(response.rows.length === 0) {
            return res.status(404).json("Product not found");
        } else {
            return res.json(response.rows);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});
module.exports = router;