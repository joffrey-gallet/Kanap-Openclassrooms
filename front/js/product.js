
/**
 * initial function
 */
async function init() {
    const productId = getProductId();
    const product = await getProduct(productId);
    displayProduct(product);
}
init();


/**
 * get id of product to complete URL
 * @returns string
 */
function getProductId() {
    // object to create new URL for single product.
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
/**
 * manage click event to create the choice to push in cart
 * @param {object} product 
 */
function clickTocart(product) {
    document.querySelector("#addToCart").addEventListener("click", (e) => {
        e.preventDefault();
        const color = document.querySelector("#colors").value;
        const quantity = Number(document.querySelector("input").value);
        //what is happening if color is null or undefined
        if (!color) {
            alert("Veuillez sélectionner une couleur !")
            return
        }
        //what is happening if quantity is not correctly defined
        if (quantity <= 0 || quantity > 100) {
            alert("Sélectionnez un nombre entre 1 et 100.");
            return
        }
        //create the const choice to push the object in cart
        const choice = {
            id: `${product._id}`,
            quantity,
            color
        }
        alert("Ajouté au panier !");
        addToCart(choice);
    })
}
/**
 * push the choice to cart (localStorage)
 * @param {object} product 
 */
function addToCart(product) {
    //define the const cart calling the function getCart() who is saving object in LS
    const cart = getCart();
    //stock in const findProduct a method with callback to find product id and color to push in cart
    const findProduct = cart.find((p) => p.id === product.id && p.color === product.color);

    if (findProduct !== undefined) {
        // Number change a string to number
        findProduct.quantity += Number(document.querySelector("input").value);
    } else {
        cart.push(product);
    }
    saveCart(cart);
}
/**
 * change array cart in string and save cart in LS
 * @param {object} cart 
 */
function saveCart(cart) {
    // order products by id
    cart.sort((a, b) => a.id.localeCompare(b.id));
    //set cart in localStorage so "string"
    localStorage.setItem("cart", JSON.stringify(cart))
}
/**
 * get the cart in LS and parse it
 * @returns object
 */
function getCart() {
    const cart = localStorage.getItem("cart");
    if (cart === null) {
        return []
    } else {
        return JSON.parse(cart)
    }
}
