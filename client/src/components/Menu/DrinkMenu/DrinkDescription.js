import React, { useEffect, useState } from "react";

import { addToCart } from "../../../utils/cartFunctions";
import { convertNameToImage } from "../../../utils/convertNameToImage";
import { toggleProductInfo } from "../../../utils/toggleProductInfo";

import '../ProductDescription.css';

const DrinkDescription = ({ product, cartNumChange }) => {
    const [productSize, setProductSize] = useState("M");
    const [productPrice, setProductPrice] = useState(product.medium_price);
    const productName = product.product_name;
    const productId = product.product_id;

    const setSize = (e) => {
        setProductSize(e.target.value);
    };

    const toggleInfo = (e) => {
        toggleProductInfo(productId);
    };

    const addToOrder = async () => {
        await addToCart(productId, productName, productSize, cartNumChange);
    };

    useEffect(() => {
        switch(productSize) {
            case "S":
                setProductPrice(product.small_price);
                break;
            case "M":
                setProductPrice(product.medium_price);
                break;
            case "L":
                setProductPrice(product.large_price);
                break;
            default:
                break;
        }
    }, [productSize, product]);

    return (
        <div className="product-description" id={`${productId}-description`}>
            <div className="product-info" id={`${productId}-info`}>
                <button className="product-button" onClick={toggleInfo}>
                    <div className="product-name-and-image">
                        <img className="product-image" alt="" src={require(`../../../images/drinks/${convertNameToImage(productName)}`)} />
                        <h4 className="product-name">{productName}</h4>
                    </div>
                </button>
                <div className="product-selections selections-space-btwn" id={`${productId}-selections`}>
                    <form className="size-selector">
                            <div>
                                <label htmlFor="Small">Small</label>
                                <input id="Small" name="size" type="radio" value="S" onClick={setSize} />
                            </div>
                            <div>
                                <label htmlFor="Medium">Medium</label>
                                <input id="Medium" name="size" type="radio" value="M" onClick={setSize} defaultChecked/>
                            </div>
                            <div>
                                <label htmlFor="Large">Large</label>
                                <input id="Large" name="size" type="radio" value="L" onClick={setSize} />
                            </div>
                    </form>
                    <div className="price-and-btn">
                        <div className="product-price">Price: $<span>{productPrice}</span></div>
                        <button className="btn btn-white btn-animate" onClick={addToOrder}>Add To Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrinkDescription;