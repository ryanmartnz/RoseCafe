import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MenuCategories from "../../components/Menu/MenuCategories";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import DrinkDescription from "../../components/Menu/DrinkMenu/DrinkDescription";
import FoodDescription from "../../components/Menu/FoodMenu/FoodDescription";

import './ProductMenu.css';

const ProductMenu = ({ cartNumChange }) => {
    const [products, setProducts] = useState([]);
    const { productType } = useParams();

    const productCategories = {
        "hot-coffees": "Hot Coffees",
        "cold-coffees": "Cold Coffees",
        "sparklers": "Sparklers",
        "frozen-coffees": "Frozen Coffees",
        "hot-teas": "Hot Teas",
        "iced-teas": "Iced Teas",
        "milk-juice": "Milk & Juices",
        "hot-breakfast": "Hot Breakfast",
        "bakery": "Bakery",
        "lunch": "Lunch"
    };
    const productCategory = productCategories[productType];


    const getProducts = useCallback(async () => {
        let fetchURL = 'https://rosecafe.onrender.com/menu/';

        if(window.location.href.includes("drinks")) {
            fetchURL += `drinks/${productType}`;
        } else if(window.location.href.includes("food")) {
            fetchURL += `food/${productType}`;
        }

        const response = await fetch(fetchURL, {
            method: "GET",
            credentials: "include"
        });
        if(response.ok) {
            const parseRes = await response.json();
            setProducts(parseRes);
        }
    }, [productType]);

    useEffect(() => {        
        getProducts();

        const previousActive = document.querySelectorAll(".active");
        if(previousActive.length !== 0) {
            for(let i = 0; i < previousActive.length; i++) {
                previousActive[i].classList.remove("active");
            }
        }
    }, [getProducts, productType]);

    return (
        <Fragment>
            <h1>Menu</h1>
            <div className="menu-with-nav">
                <MenuCategories />
                <div className="menu-container">
                    <Breadcrumbs prevPage={"/menu"} prevPageName={"Menu"} curPageName={productCategory} />
                    <h2>{productCategory}</h2>
                    { products.length !== 0 && (
                        <div className="products-container">
                            { products[0].product_id.slice(0,1) === 'D' && 
                                products.map((product, index) => {
                                    return <DrinkDescription product={product} cartNumChange={cartNumChange} />;
                                })
                            }
                            { products[0].product_id.slice(0,1) === 'F' && 
                                products.map((product, index) => {
                                    return <FoodDescription product={product} cartNumChange={cartNumChange} />;
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default ProductMenu;