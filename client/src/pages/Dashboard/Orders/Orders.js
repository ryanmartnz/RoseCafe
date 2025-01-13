import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Orders.css';

import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import OrderCard from "../../../components/OrderCard/OrderCard";

const Orders = ({ cartNumChange }) => {
    const [userOrders, setUserOrders] = useState([]);
    let { ordersType } = useParams();

    if(!ordersType) {
        ordersType = "ready-completed";
    }

    const getUserOrders = useCallback(async () => {
        const response = await fetch(`https://api.rosecafe.tech/orders/${ordersType}`, {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) {
            const parseRes = await response.json();
            setUserOrders(parseRes);
        }
    }, [ordersType]);

    useEffect(() => {
        getUserOrders();
    }, [getUserOrders, ordersType]);

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
            { userOrders.length === 0 && (
                <div style={{textAlign: "center"}}>No orders found...</div>
            )}
            { userOrders.length !== 0 && ordersType !== "ordered-items" && (
                <div className="order-cards-container">
                    {
                        userOrders.map((order, index) => {
                            return (
                                <div key={index}>
                                    <OrderCard order={order} orderType={ordersType} />
                                </div>
                            );
                        })
                    }
                </div>
            )}
        </div>
    );
};

export default Orders;