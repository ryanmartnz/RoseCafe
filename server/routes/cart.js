const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");
const getProductInfo = require("../middleware/productInfo");

const TAX_RATE = 0.075;

router.get("/", authorization, async (req, res) => {
    try {
        const userCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 ORDER BY cart_id", [req.user]);
        res.json(userCart.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/total-price", authorization, async (req, res) => {
    try {
        const userCart = await pool.query("SELECT SUM(total_price) FROM user_carts WHERE cart_user_id = $1", [req.user]);

        let salesTax = userCart.rows[0].sum * TAX_RATE;
        let roundedSalesTax = Math.round((salesTax + Number.EPSILON) * 100) / 100;

        res.json([{
            "sum": userCart.rows[0].sum,
            "sales_tax": roundedSalesTax.toFixed(2)
        }]);
        
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/add-to-cart", authorization, getProductInfo, async (req, res) => {
    try {
        const { product_id, product_name, product_size, quantity, total_price } = req.body;

        // Check if the product already exists in the user's cart
        const existsInCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 AND product_id = $2 AND product_size = $3", [req.user, product_id, product_size]);

        // If the product already exists in the user's cart, update the quantity
        if(existsInCart.rows.length !== 0) {
            await pool.query(
                "UPDATE user_carts SET quantity = quantity + $1, total_price = total_price + $2 WHERE cart_user_id = $3 AND product_id = $4 AND product_size = $5", 
                [quantity, total_price, req.user, product_id, product_size]
            );
        } else {
            await pool.query(
                "INSERT INTO user_carts (cart_user_id, product_id, product_name, product_size, quantity, total_price) VALUES ($1, $2, $3, $4, $5, $6)",
                [req.user, product_id, product_name, product_size, quantity, total_price]
            );
        }
        
        const userCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 ORDER BY cart_id", [req.user]);
        res.json(userCart.rows);
        
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/remove-from-cart", authorization, getProductInfo, async(req, res) => {
    try {
        const { product_id, product_size, quantity, total_price } = req.body;

        // Check if the product already exists in the user's cart
        const existsInCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 AND product_id = $2 AND product_size = $3", [req.user, product_id, product_size]);

        if(existsInCart.rows.length === 0) {
            return res.status(404).json("Product not found in cart");
        }

        await pool.query(
            "UPDATE user_carts SET quantity = quantity - $1, total_price = total_price - $2 WHERE cart_user_id = $3 AND product_id = $4 AND product_size = $5", 
            [quantity, total_price, req.user, product_id, product_size]
        );
        
        const userCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 ORDER BY cart_id", [req.user]);
        res.json(userCart.rows);

    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/update-quantity", authorization, getProductInfo, async (req, res) => {
    try {
        const { product_id, product_size, quantity, total_price } = req.body;
        
        // Check if the product already exists in the user's cart
        const existsInCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 AND product_id = $2 AND product_size = $3", [req.user, product_id, product_size]);
    
        if(existsInCart.rows.length !== 0) {
            await pool.query(
                "UPDATE user_carts SET quantity = $1, total_price = $2 WHERE cart_user_id = $3 AND product_id = $4 AND product_size = $5", 
                [quantity, total_price, req.user, product_id, product_size]
            );
        } else {
            return res.status(404).json("Product not found in cart");
        }

        const userCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 ORDER BY cart_id", [req.user]);
        res.json(userCart.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/submit-order", authorization, async (req, res) => {
    try { 
        const cartTotal = await pool.query("SELECT SUM(total_price) FROM user_carts WHERE cart_user_id = $1", [req.user]);

        const salesTax = cartTotal.rows[0].sum * TAX_RATE;
        const roundedSalesTax = Math.round((salesTax + Number.EPSILON) * 100) / 100;
        const totalPrice = +roundedSalesTax + +cartTotal.rows[0].sum;

        const orderId = await pool.query(
            "INSERT INTO order_details(user_id, total) VALUES ($1, $2) RETURNING order_id", 
            [req.user, totalPrice]
        );

        const userCart = await pool.query("SELECT * FROM user_carts WHERE cart_user_id = $1 ORDER BY cart_id", [req.user]);
        
        userCart.rows.forEach(async (cartItem) => {
            await pool.query(
                "INSERT INTO order_items(order_id, product_id, product_size, quantity) VALUES ($1, $2, $3, $4)", 
                [orderId.rows[0].order_id, cartItem.product_id, cartItem.product_size, cartItem.quantity]
            );
        });

        await pool.query("DELETE FROM user_carts WHERE cart_user_id = $1", [req.user]);

        res.json({ success: true });

    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;