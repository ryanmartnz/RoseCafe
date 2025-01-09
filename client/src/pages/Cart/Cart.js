import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CartItem from "../../components/CartItem/CartItem";
import "./Cart.css";

const Cart = ({ cartNumChange, cartSetNum }) => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState("0.00");
    const [cartTax, setCartTax] = useState("0.00");

    const getCartItems = async () => {
        const response = await fetch(`http://localhost:3001/cart`, {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) {
            const parseRes = await response.json();
            setCartItems(parseRes);
        }
    };

    const getCartTotal = async () => {
        const response = await fetch(`http://localhost:3001/cart/total-price`, {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) {
            const parseRes = await response.json();
            setCartTotal(parseRes[0].sum);
            setCartTax(parseRes[0].sales_tax);
        }
    };

    const submitOrder = async () => {
        const response = await fetch(`http://localhost:3001/cart/submit-order`, {
            method: "POST",
            credentials: "include"
        });
        if(response.ok) {
            cartSetNum(0);
            alert("Your order has been successfully placed!");
            navigate("/dashboard");
        }
    };

    useEffect(() => {
        getCartItems();
        getCartTotal();

        if(cartItems.length === 0) {
            document.getElementById("cart-container").style.display = "none";
            document.getElementById("submit-order-button-container").style.display = "none";
            document.getElementById("nothing-in-cart").style.display = "block"
        } else {
            document.getElementById("cart-container").style.display = "flex";
            document.getElementById("submit-order-button-container").style.display = "block";
            document.getElementById("nothing-in-cart").style.display = "none"
        }
    });

    return (
        <Fragment>
            <h1>Cart</h1>
            <div className="nothing-in-cart" id="nothing-in-cart">
                <p>Nothing to see here!</p>
            </div>
            <div className="cart-container" id="cart-container">
                <div className="cart-items-container">
                    {
                        cartItems.map(cartItem => {
                            return (
                                <div className="cart-item-container" id={`${cartItem.product_id}-${cartItem.product_size}-container`} key={`${cartItem.product_id}-${cartItem.product_size}`}>
                                    <CartItem cartItem={cartItem} cartNumChange={cartNumChange} cartSetNum={cartSetNum} />
                                </div>
                            );
                        })
                    }
                </div>
                <div className="cart-total-container">
                    <div className="total-price-header">Order Total</div>
                    <div className="cart-subtotal-tax">
                        <div>Subtotal:</div>
                        <div className="dot"></div>
                        <div>${cartTotal}</div>
                    </div>
                    <div className="cart-subtotal-tax">
                        <div>Tax:</div>
                        <div className="dot"></div>
                        <div>${cartTax}</div>
                    </div>
                    <div className="cart-total">
                        <div>Total:</div>
                        <div className="dot"></div>
                        <div>${(+cartTotal + +cartTax).toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className="submit-order-button-container" id="submit-order-button-container">
                <button className="submit-order-button" onClick={submitOrder}>Submit Order</button>
            </div>
        </Fragment>
    );
};

export default Cart;