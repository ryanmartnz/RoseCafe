import React, { useCallback, useEffect, useState } from "react";
import { toast, Slide } from 'react-toastify';
import './OrderCard.css';

const OrderCard = ({ order, orderType }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    let orderStatus, statusDescription;
    switch(order.order_status) {
        case 'IN_PROGRESS':
            orderStatus = "In Progress...";
            statusDescription = "We are working on completing your order.";
            break;
        case 'READY':
            orderStatus = "Your order is ready!";
            statusDescription = "You can now pick up your order at the cafe.";
            break;
        case 'COMPLETED':
            orderStatus = "Order Completed";
            statusDescription = "Your order was picked up. Thank you!";
            break;
        case 'CANCELLED':
            orderStatus = "Order Cancelled";
            statusDescription = "Your order has been cancelled.";
            break;
        default:
            break;
    }

    const convertTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const getItemSize = (itemSize) => {
        if(itemSize === 'S') {
            return 'Small ';
        } else if(itemSize === 'M') {
            return 'Medium ';
        } else if(itemSize === 'L') {
            return 'Large ';
        } else {
            return '';
        }
    };

    const toggleCancelAlert = () => {
        if(showAlert) {
            setShowAlert(false);
        } else {
            setShowAlert(true);
        }
    };

    const cancelOrder = async () => {
        const response = await fetch(`http://localhost:3001/orders/cancel-order/${order.order_id}`, {
            method: "PUT",
            credentials: "include"
        });
        if(response.ok) {
            toast.dismiss();
            toast(`Order #${order.order_id} Cancelled`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide
            });
            toggleCancelAlert();
        }
    };

    const getOrderItems = useCallback(async () => {
        const response = await fetch(`http://localhost:3001/orders/${order.order_id}`, {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) {
            const parseRes = await response.json();
            setOrderItems(parseRes);
        }
    }, [order]);

    useEffect(() => {
        getOrderItems();
    });
    
    return (
        <>
            <div className="order-card">
                <div className="order-card-header">
                    <div className="order-card-inner">
                        <div className="inner-card-header">
                            <div className="left-side">
                                <div className="card-column">
                                    <div className="card-row column-title">Order Placed</div>
                                    <div className="card-row">{convertTimestamp(order.created_at)}</div>
                                </div>
                                <div className="card-column">
                                    <div className="card-row column-title">Total</div>
                                    <div className="card-row">${order.total}</div>
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="order-number">ORDER # {order.order_id}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-card-body">
                    <div className="order-card-inner">
                        <div className="inner-card-body">
                            <div className="order-card-main">
                                <div className="order-status-container">
                                    <div className="order-status">{orderStatus}</div>
                                    <div className="status-description">{statusDescription}</div>
                                </div>
                                <div className="items-in-order-container">
                                    {
                                        orderItems.map((item, index) => {
                                            return (
                                                <div className="ordered-item-container" key={index}>
                                                    <div className="quantity-sep">
                                                        <div className="item-quantity">{item.quantity}x</div>
                                                        <div className="dot"></div>
                                                    </div>
                                                    <div className="item-name">{getItemSize(item.product_size)}{item.product_name}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="order-selections">
                                <button className="order-support-btn">Get Order Support</button>
                                {order.order_status === "COMPLETED" && <button>Write an Order Review</button>}
                                {order.order_status === "IN_PROGRESS" && <button className="cancel-order-btn" onClick={toggleCancelAlert}>Cancel Order</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { showAlert && (
                <div id={`${order.order_id}-cancel-popup`} className="cancel-confirm-popup">
                    <div className="cancel-popup-content">
                        <div className="popup-header">
                            <div>You are about to cancel your in-progress order!</div>
                        </div>
                        <div className="popup-body">
                            <div>Order placed: {convertTimestamp(order.created_at)}</div>
                            <div className="items-in-order-container">
                                {
                                    orderItems.map(item => {
                                        return (
                                            <div className="ordered-item-container">
                                                <div className="quantity-sep">
                                                        <div className="item-quantity">{item.quantity}x</div>
                                                        <div className="dot"></div>
                                                </div>
                                                <div className="item-name">{getItemSize(item.product_size)}{item.product_name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="popup-footer">
                            <div>Confirm Cancellation?</div>
                            <div className="confirm-cancel-btns">
                                <button onClick={cancelOrder}>Yes</button>
                                <button onClick={toggleCancelAlert}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderCard;