import { toast, Slide } from 'react-toastify';

export const addToCart = async (productId, productName, productSize, cartNumChange) => {
    const body = {
        "product_id": productId, 
        "product_name": productName,
        "product_size": productSize, 
        "quantity": 1
    };
    const response = await fetch(`https://api.rosecafe.tech/cart/add-to-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include"
    });

    if(response.ok) {
        await response.json();
        cartNumChange(1);
        toast.dismiss();
        toast(`${productName} Added to Your Cart`, {
            className: "bottom-popup",
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
    } else if(response.status === 403) {
        cartErrorMessage();
    }
};

export const removeFromCart = async (productId, productSize, cartNumChange) => {
    const body = {
        "product_id": productId, 
        "product_size": productSize, 
        "quantity": 1
    };
    const response = await fetch(`https://api.rosecafe.tech/cart/remove-from-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include"
    });

    if(response.ok) {
        await response.json();
        cartNumChange(-1);
        return true;
    } else if(response.status === 403) {
        alert("You must be logged in to remove items from your cart!");
        return false;
    }
};

export const updateCartItemAmount = async (productId, productSize, newQuantity, cartSetNum) => {
    const body = {
        "product_id": productId, 
        "product_size": productSize, 
        "quantity": newQuantity
    };
    const response = await fetch(`https://api.rosecafe.tech/cart/update-quantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include"
    });

    if(response.ok) {
        await response.json();
        cartSetNum(+newQuantity);
        return true;
    } else if(response.status === 403) {
        alert("You must be logged in to add/remove items from your cart!");
        return false;
    }
};

const cartErrorMessage = () => {
    toast.error('You must be logged in to make changes to your cart!', {
        toastId: "log-in-error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
};