export const toggleProductInfo = (productId) => {
    const previousActive = document.querySelectorAll(".active");
    if(previousActive.length !== 0) {
        for(let i = 0; i < previousActive.length; i++) {
            previousActive[i].classList.remove("active");
        }
    }
    const DrinkDescription = document.getElementById(`${productId}-description`);
    DrinkDescription.classList.add("active");
    const productSelections = DrinkDescription.querySelector(".product-selections");
    productSelections.classList.add("active");
}