import React, { Fragment } from "react";
import MenuCategories from '../../components/Menu/MenuCategories';
import './Menu.css';

const Menu = () => {
    return (
        <Fragment>
            <h1>Menu</h1>
            <div className="menu-with-nav">
                <MenuCategories />
            </div>
        </Fragment>
    );
}

export default Menu;