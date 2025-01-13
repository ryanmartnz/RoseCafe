import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Coffee, ClockCounterClockwise, ShieldStar, Headset } from 'phosphor-react';
import { Link } from "react-router-dom";

const Dashboard = ({ setAuth }) => {
    const [firstName, setFirstName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch("https://rosecafe.onrender.com/dashboard/", {
                method: "GET",
                credentials: "include"
            });
            const parseRes = await response.json();
            setFirstName(parseRes.user_first_name);
        } catch(err) {
            console.error(err.message);
        }
    };

    const getGreeting = () => {
        const curHour = (new Date()).getHours();
        if(curHour < 12) {
            return "Morning";
        } else if(curHour < 18) {
            return "Afternoon";
        } else {
            return "Evening";
        }
    };

    useEffect(() => {
        getName();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dash-intro">
                <div className="dash-greeting">{`Good ${getGreeting()}, ${firstName}!`}</div>
                <div>What would you like to do today?</div>
            </div>
            <div className="dash-options-container">
                <Link to="/menu" className="dash-option-link">
                    <div className="option-card">
                        <div className="card-icon">
                            <Coffee size={36}></Coffee>
                        </div>
                        <div className="option-card-content">
                            <div className="option-card-title">Place An Order</div>
                            <div className="option-card-desc">Select your items, pay, and pick it up!</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </div>
                </Link>
                <Link to="/dashboard/orders" className="dash-option-link">
                    <div className="option-card">
                        <div className="card-icon">
                            <ClockCounterClockwise size={36}></ClockCounterClockwise>
                        </div>
                        <div className="option-card-content">
                            <div className="option-card-title">Your Orders</div>
                            <div className="option-card-desc">View, track, cancel an order, or purchase again</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </div>
                </Link>
                <Link to="/dashboard" className="dash-option-link">
                    <div className="option-card">
                        <div className="card-icon">
                            <ShieldStar size={36}></ShieldStar>
                        </div>
                        <div className="option-card-content">
                            <div className="option-card-title">Login & Security</div>
                            <div className="option-card-desc">Change login, name, and other sensitive information</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </div>
                </Link>
                <Link to="/dashboard" className="dash-option-link">
                    <div className="option-card">
                        <div className="card-icon">
                            <Headset size={36}></Headset>
                        </div>
                        <div className="option-card-content">
                            <div className="option-card-title">Customer Service</div>
                            <div className="option-card-desc">View FAQs, help articles, or speak with a member of our team</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;