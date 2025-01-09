import React from "react";
import './Home.css';

const Home = () => {
    return (
        <>
            <div className="home-box">
                <div className="box-content">
                    <div className="box-image-container">
                        <img className="box-image" alt="" src={require('../../images/pink-lotus-mocha.png')}/>
                    </div>
                    <div className="box-desc">
                        <h2 className="desc-title">How can we help make your day blossom?</h2>
                        <a className="desc-button" href="/menu">Order now</a>
                    </div>
                </div>
            </div>
            <div className="home-box">
                <div className="box-content">
                    <div className="box-desc">
                        <h2 className="desc-title">Stop and smell the roses!</h2>
                        <a className="desc-button" href="/register">Sign up</a>
                    </div>
                    <div className="box-image-container">
                        <img className="box-image" alt="" src={require('../../images/pink-rose-tea.png')}/>
                    </div>
                </div>
            </div>
            <div className="home-box">
                <div className="box-content">
                    <div className="box-image-container">
                        <img className="box-image" alt="" src={require('../../images/pink-camellia-impossible.png')}/>
                    </div>
                    <div className="box-desc">
                        <h2 className="desc-title">It's never too late for breakfast!</h2>
                        <a className="desc-button" href="/menu/food/hot-breakfast">Order now</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;