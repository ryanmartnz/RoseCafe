import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import { 
  BrowserRouter as Router, 
  Routes,
  Route, 
  Navigate
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components

import Navbar from './components/Navbar/Navbar';

// Pages

import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Menu from './pages/Menu/Menu';
import ProductMenu from './pages/Menu/ProductMenu';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Dashboard/Orders/Orders';
import OrderAgain from './pages/Dashboard/Orders/OrderAgain';
import Footer from './components/Footer/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [numInCart, setNumInCart] = useState(0);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const isAuth = useCallback(async () => {
    try {
      const response = await fetch("https://api.rosecafe.tech/auth/is-verify", {
        method: "GET",
        credentials: "include"
      });
      if(response.status === 403) {
        setIsAuthenticated(false);
      } else {
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
    } catch(err) {
      console.error(err.message);
    }
  }, []);

  const cartNumChange = num => {
    setNumInCart(cartNum => cartNum + num);
  };

  const cartSetNum = newNum => {
    setNumInCart(newNum);
  };

  const getNumInCart = useCallback(async () => {
    try {
      if(isAuthenticated) {
        const response = await fetch(`https://api.rosecafe.tech/cart`, {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) {
            const parseRes = await response.json();
            let num = 0;
            parseRes.forEach(cartItem => {
                num += cartItem.quantity;
            });
            setNumInCart(num);
        }
      }
    } catch(err) {
      console.error(err.message);
    }

  }, [isAuthenticated]);

  useEffect(() => {
    isAuth();
    getNumInCart();
  }, [isAuth, getNumInCart]);

  if(isAuthenticated === null) {
    return <div></div>;
  } else {
    return (
      <>
        <Router>
          <Navbar setAuth={setAuth} numInCart={numInCart}/>
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="about" 
                element={<About />} 
              />
              <Route 
                path="/login" 
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
              <Route 
                path="/register" 
                element={
                  !isAuthenticated ? (
                    <Register setAuth={setAuth}/>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route 
                path="/dashboard" 
                element={
                  !isAuthenticated ? (
                    <Navigate to="/login" />
                  ) : (
                    <Dashboard setAuth={setAuth}/>
                  )
                }
              />
              <Route 
                path="/dashboard/orders" 
                element={
                  !isAuthenticated ? (
                    <Navigate to="/login" />
                  ) : (
                    <Orders cartNumChange={cartNumChange}/>
                  )
                }
              />
              <Route 
                path="/dashboard/orders/ordered-items" 
                element={
                  !isAuthenticated ? (
                    <Navigate to="/login" />
                  ) : (
                    <OrderAgain cartNumChange={cartNumChange}/>
                  )
                }
              />
              <Route 
                path="/dashboard/orders/:ordersType" 
                element={
                  !isAuthenticated ? (
                    <Navigate to="/login" />
                  ) : (
                    <Orders cartNumChange={cartNumChange}/>
                  )
                }
              />
              <Route 
                path="/menu" 
                element={<Menu />}
              />
              <Route 
                path="/cart"
                element={
                  !isAuthenticated ? (
                    <Menu />
                  ) : (
                    <Cart cartNumChange={cartNumChange} cartSetNum={cartSetNum} />
                  )
                }
              />
              <Route path="/menu/drinks/:productType" element={<ProductMenu cartNumChange={cartNumChange} />}/>
              <Route path="/menu/food/:productType" element={<ProductMenu cartNumChange={cartNumChange} />}/>
            </Routes>
          </div>
          <Footer />
        </Router>
        <ToastContainer />
      </>
    );
  }
}

export default App;
