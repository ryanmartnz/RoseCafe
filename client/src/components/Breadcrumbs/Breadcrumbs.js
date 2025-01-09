import React from "react";
import { Link } from "react-router-dom";
import './Breadcrumbs.css';

const Breadcrumbs = ({ prevPage, prevPageName, curPageName }) => {
    return (
        <nav className="breadcrumbs">
            <ul>
                <li><Link to={prevPage}>{prevPageName}</Link><span>&nbsp;/&nbsp;</span></li>
                <li><span className="current-page">{curPageName}</span></li>
            </ul>
        </nav>
    );
};

export default Breadcrumbs;