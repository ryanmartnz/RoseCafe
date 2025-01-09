import React from "react";

import { addToCart } from "../../../utils/cartFunctions";
import { convertNameToImage } from "../../../utils/convertNameToImage";
import { toggleProductInfo } from "../../../utils/toggleProductInfo";

import '../ProductDescription.css';

const FoodDescription = ({ product, cartNumChange }) => {
    const productPrice = product.product_base_price;
    const productName = product.product_name;
    const productId = product.product_id;

    const toggleInfo = (e) => {
        toggleProductInfo(productId);
    };

    const addToOrder = async () => {
        await addToCart(productId, productName, "F", cartNumChange);
    };

    return (
        <div className="product-description" id={`${productId}-description`}>
            <div className="product-info" id={`${productId}-info`}>
                <button className="product-button" onClick={toggleInfo}>
                    <div className="product-name-and-image">
                        <img className="product-image" alt="" src={require(`../../../images/food/${convertNameToImage(productName)}`)} />
                        <h4 className="product-name">{productName}</h4>
                    </div>
                </button>
                <div className="product-selections selections-center" id={`${productId}-selections`}>
                    <div className="price-and-btn">
                        <div className="product-price">Price: $<span>{productPrice}</span></div>
                        <button className="btn btn-white btn-animate" onClick={addToOrder}>Add To Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDescription;