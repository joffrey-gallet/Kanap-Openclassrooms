
/**
 * initial function
 */
async function init() {
    const productId = getProductId();
    const product =  await getProduct(productId);
    console.log(product);
    displayProduct(product);   
}
init();


/**
 * get id of product to complete URL
 * @returns string
 */
function getProductId() {
    return new URL(location.href).searchParams.get("id");
}


/**
 * get product informations
 * @param {string} productId 
 * @returns Object
 */
async function getProduct(productId) {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await response.json();
    return product;
}

function displayProduct(product) {

    
    document.getElementById("title").innerHTML = `${product.name}`;
    
    document.getElementById("price").innerHTML = `${product.price}`;
    
    document.getElementById("description").innerHTML = `${product.description}`;
    
    for (let colors of product.colors) {     
        const optionColors = document.getElementById("colors")
        optionColors.value.textContent += colors
        const option = document.createElement("option")
        option.setAttribute("value", colors)
        optionColors.appendChild(option)
        option.textContent += colors
    }


}