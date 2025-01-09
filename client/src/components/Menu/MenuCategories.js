import React, { Fragment } from "react";
import './MenuCategories.css';
import { Link } from "react-router-dom";

const MenuCategories = () => {
    return (
        <Fragment>
            <nav className="product-categories">
                <ul>
                    <li>
                        <span>Drinks</span>
                        <ul>
                            <li><Link to="/menu/drinks/hot-coffees">Hot Coffees</Link></li>
                            <li><Link to="/menu/drinks/cold-coffees">Cold Coffees</Link></li>
                            <li><Link to="/menu/drinks/sparklers">Sparklers</Link></li>
                            <li><Link to="/menu/drinks/frozen-coffees">Frozen Coffees</Link></li>
                            <li><Link to="/menu/drinks/hot-teas">Hot Teas</Link></li>
                            <li><Link to="/menu/drinks/iced-teas">Iced Teas</Link></li>
                            <li><Link to="/menu/drinks/milk-juice">Milk & Juices</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Food</span>
                        <ul>
                            <li><Link to="/menu/food/hot-breakfast">Hot Breakfast</Link></li>
                            <li><Link to="/menu/food/bakery">Bakery</Link></li>
                            <li><Link to="/menu/food/lunch">Lunch</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
}

export default MenuCategories;