const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");

router.get("/ready-completed", authorization, async (req, res) => {
    try {
        const userOrders = await pool.query(
            "SELECT * FROM order_details WHERE user_id = $1 AND (order_status = 'READY' OR order_status = 'COMPLETED')", 
            [req.user]
        );
        res.json(userOrders.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/ordered-items", authorization, async (req, res) => {
    try {
        let orderedItems = [];
        const itemIds = await pool.query(
            "SELECT DISTINCT product_id FROM order_details d JOIN order_items i ON d.order_id = i.order_id WHERE d.user_id = $1", 
            [req.user]
        );
        for(let item in itemIds.rows) {
            if((itemIds.rows[item].product_id).slice(0,1) === 'D') {
                const product = await pool.query(
                    "SELECT * FROM products p JOIN drinks_size_prices d ON p.product_id = d.product_id WHERE p.product_id = $1",
                    [itemIds.rows[item].product_id]
                );
                orderedItems.push(product.rows[0]);
            } else {
                const product = await pool.query(
                    "SELECT * FROM products WHERE product_id = $1",
                    [itemIds.rows[item].product_id]
                );
                orderedItems.push(product.rows[0]);
            }
        }
        res.json(orderedItems);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/not-ready", authorization, async (req, res) => {
    try {
        const userOrdersIP = await pool.query(
            "SELECT * FROM order_details WHERE user_id = $1 AND order_status = 'IN_PROGRESS'", 
            [req.user]
        );
        res.json(userOrdersIP.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/cancelled", authorization, async (req, res) => {
    try {
        const cancelledUserOrders = await pool.query(
            "SELECT * FROM order_details WHERE user_id = $1 AND order_status = 'CANCELLED'", 
            [req.user]
        );
        res.json(cancelledUserOrders.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/:orderId", authorization, async (req, res) => {
    try {
        const orderExists = await pool.query(
            "SELECT EXISTS(SELECT * FROM order_details WHERE user_id = $1 AND order_id = $2)", 
            [req.user, req.params.orderId]
        );
        if(orderExists.rows[0].exists === false) {
            return res.status(404).json("Order not found.");
        }

        const userOrder = await pool.query(
            "SELECT o.product_id, p.product_name, o.product_size, o.quantity FROM order_items o JOIN products p ON o.product_id = p.product_id WHERE o.order_id = $1", 
            [req.params.orderId]
        );
        res.json(userOrder.rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.put("/cancel-order/:orderId", authorization, async (req, res) => {
    try {
        const orderExists = await pool.query(
            "SELECT EXISTS(SELECT * FROM order_details WHERE user_id = $1 AND order_id = $2)", 
            [req.user, req.params.orderId]
        );
        if(orderExists.rows[0].exists === false) {
            return res.status(404).json("Order not found.");
        }

        await pool.query(
            "UPDATE order_details SET order_status = 'CANCELLED', date_cancelled = CURRENT_TIMESTAMP WHERE order_id = $1", 
            [req.params.orderId]
        );
        res.json({success: true});
    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;