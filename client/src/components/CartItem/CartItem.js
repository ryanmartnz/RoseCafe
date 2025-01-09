import React, { Fragment } from "react";
import { addToCart, removeFromCart, updateCartItemAmount } from "../../utils/cartFunctions";
import { timeout } from "../../utils/timeout";

import './CartItem.css';

const CartItem = ({ cartItem, cartNumChange, cartSetNum }) => {
    const addOne = async () => {
        await addToCart(cartItem.product_id, cartItem.product_name, cartItem.product_size, cartNumChange);
    };

    const removeOne = async () => {
        if((cartItem.quantity - 1) === 0) {
            document.getElementById(`${cartItem.product_id}-${cartItem.product_size}-container`).classList.add("fadeOut");
            await timeout(1000);
        }
        await removeFromCart(cartItem.product_id, cartItem.product_size, cartNumChange);
    };

    const updateAmount = async (e) => {
        const newQuantity = e.target.value;

        if(newQuantity === "") return;
        if(newQuantity === 0 || newQuantity === "0") {
            document.getElementById(`${cartItem.product_id}-${cartItem.product_size}-container`).classList.add("fadeOut");
            await timeout(1000);
        }
        await updateCartItemAmount(cartItem.product_id, cartItem.product_size, newQuantity, cartSetNum);
    };

    return (
        <Fragment>
            <div className="cart-item-description">
                <div className="product-name-size">
                    <div className="product-name">
                        <h3>{cartItem.product_name}</h3>
                    </div>
                    <div className="product-size">
                        { cartItem.product_size === "S" && (
                            <p>Size: <span>Small</span></p>
                        )}
                        { cartItem.product_size === "M" && (
                            <p>Size: <span>Medium</span></p>
                        )}
                        { cartItem.product_size === "L" && (
                            <p>Size: <span>Large</span></p>
                        )}
                    </div>
                </div>
                <div className="quantity-container">
                    <button onClick={removeOne}>-</button>
                    <input type="number" value={cartItem.quantity} onChange={updateAmount}/>
                    <button onClick={addOne}>+</button>
                </div>
                <div className="total-price">
                    <h4>Price: $<span>{cartItem.total_price}</span></h4>
                </div>
            </div>
        </Fragment>
    );
};

export default CartItem;