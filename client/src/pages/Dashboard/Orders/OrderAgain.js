import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './OrderAgain.css';

import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import DrinkDescription from "../../../components/Menu/DrinkMenu/DrinkDescription";
import FoodDescription from "../../../components/Menu/FoodMenu/FoodDescription";

const OrderAgain = ({ cartNumChange }) => {
    const [orderedItems, setOrderedItems] = useState([]);

    const getOrderedItems = useCallback(async () => {
        const response = await fetch(`https://api.rosecafe.tech/orders/ordered-items`, {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) {
            const parseRes = await response.json();
            setOrderedItems(parseRes);
        }
    }, []);

    useEffect(() => {
        getOrderedItems();
    });

    return (
        <div className="your-orders-container">
            <Breadcrumbs prevPage={"/dashboard"} prevPageName={"Dashboard"} curPageName={"Your Orders"} />
            <div className="page-title">Your Orders</div>
            <div className="orders-page-tabs">
                <ul>
                    <li><Link to="/dashboard/orders">Orders</Link></li>
                    <li><Link to="/dashboard/orders/ordered-items">Buy Again</Link></li>
                    <li><Link to="/dashboard/orders/not-ready">Not Ready Yet</Link></li>
                    <li><Link to="/dashboard/orders/cancelled">Cancelled Orders</Link></li>
                </ul>
            </div>
            { orderedItems.length === 0 && (
                <div style={{textAlign: "center"}}>No orders found...</div>
            )}
            { orderedItems.length !== 0 && (
                <div className="products-container">
                    {
                        orderedItems.map((product, index) => {
                            if(product.product_id.slice(0,1) === 'D') {
                                return (
                                    <div className="product-container" key={index}>
                                        <DrinkDescription product={product} cartNumChange={cartNumChange} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="product-container" key={index}>
                                        <FoodDescription product={product} cartNumChange={cartNumChange} />
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            )}
        </div>
    );
};

export default OrderAgain;