export const convertNameToImage = (productName) => {
    let imageName = productName.replace(/\s+/g, '-').toLowerCase() + '.jpg';
    return imageName;
};