
/**
 * initial function
 */
async function init() {
    const productId = getProductId();
    const product =  await getProduct(productId);
    displayProduct(product);
}
init();


/**
 * get id of product to complete URL
 * @returns string
 */
function getProductId() {
    // object to create new URL for single product
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
    //console.log(product);
    return product;
}

/**
 * display the product 
 * @param {object} product 
 */
function displayProduct(product) {
    
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    
    document.querySelector("#title").innerHTML = `${product.name}`;
    
    document.querySelector("#price").innerHTML = `${product.price}`;
    
    document.querySelector("#description").innerHTML = `${product.description}`;
    
    for (let colors of product.colors) {     
        const optionColors = document.querySelector("#colors")
        optionColors.innerHTML += `<option value="${colors}">${colors}</option>`
    }  

    clickTocart(product);
}

function clickTocart(product) {

    document.querySelector("#addToCart").addEventListener("click", (e) => {
        e.preventDefault();
    
    let choice = {
            id : `${product._id}`,
            quantity : Number(document.querySelector("input").value),
            color : document.querySelector("#colors").value,
        }
        console.log(choice);
        addToCart(choice);
    })
}

    function addToCart(product) {
        
        const cart = getCart();
        const findProduct = cart.find((p) => p.id === product.id && p.color === product.color);
        
        if(findProduct !== undefined){
            findProduct.quantity++;
        } else{
            cart.push(product);
            //console.log(cart);
        }
        saveCart(cart);
    }    
    
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    
    function getCart() {
        const cart = localStorage.getItem("cart");
        if (cart === null) {
            return []
        } else {
            return JSON.parse(cart)
        }
    }
