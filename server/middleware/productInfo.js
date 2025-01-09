const pool = require("../database/db");

module.exports = async (req, res, next) => {
    const { product_id, product_size, quantity } = req.body;

    // Calculate the total price of the items being added to the cart
    let total_price;
    if(product_id.slice(0,1) === 'D') {
        const productPrice = await pool.query("SELECT small_price, medium_price, large_price FROM drinks_size_prices WHERE product_id = $1", [product_id]);
        if(productPrice.rows.length === 0) {
            return res.status(404).json("Product ID does not exist");
        }
        switch(product_size) {
            case "S":
                total_price = parseFloat(productPrice.rows[0].small_price) * quantity;
                break;
            case "M":
                total_price = parseFloat(productPrice.rows[0].medium_price) * quantity;
                break;
            case "L":
                total_price = parseFloat(productPrice.rows[0].large_price) * quantity;
                break;
            default:
                return res.status(404).json("Invalid product size");
                break;
        }
    } else {
        const productPrice = await pool.query("SELECT product_base_price FROM products WHERE product_id = $1", [product_id]);
        if(productPrice.rows.length === 0) {
            return res.status(404).json("Product ID does not exist");
        }
        total_price = parseFloat(productPrice.rows[0].product_base_price) * quantity;
    }
    req.body.total_price = total_price;
    next();
}