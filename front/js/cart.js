// let total price and products in global
let totalProducts = 0;
let totalPrice = 0;

/**
 * get cart in string in LS and parse it
 * @returns object
 */
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    return []
  } else {
    return JSON.parse(cart)
  }
}

//let cart in global
let cart = getCart();

/**
 * save cart in LS
 * @param {array} cart 
 */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
}


getProductData();

/**
 * get product data
 * @param {object} productData
 */
async function getProductData() {
  totalProducts = 0;
  totalPrice = 0;
  let cart = getCart();
  document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
  document.querySelector("#cart__items").innerHTML = "";
  for (const productLs of cart) {
    const response = await fetch(`http://localhost:3000/api/products/${productLs.id}`);
    const product = await response.json();

    let productData = {
      ...product,
      ...productLs
    }
    //refresh products and price
    displayProduct(productData);
    getTotalPrice(productData);
  }
  getTotalProducts();
}


/**
 * display products
 * @param {object} productData 
 */
function displayProduct(productData) {
  document.querySelector("#cart__items").innerHTML +=
    `<article class="cart__item" data-id="${productData.id}" data-color="${productData.color}">
    <div class="cart__item__img">
      <img src=${productData.imageUrl} alt=${productData.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productData.name}</h2>
        <p>${productData.color}</p>
        <p>${productData.price} €</p> 
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>`

  // Manage event when click on delete item
  const deleteItems = document.querySelectorAll(".deleteItem");
  for (const deleteButton of deleteItems) {
    deleteButton.addEventListener("click", (e) => {
      const button = e.target
      const article = button.closest("article");
      removeFromCart(article);
      getProductData();
    })
  }

  // manage event when change input value of quantity
  const itemQuantity = document.querySelectorAll(".itemQuantity");
  for (const inputQuantity of itemQuantity) {
    inputQuantity.addEventListener("change", (e) => {
      changeQuantity(e);
    })
  }
}


/**
 * remove from cart
 * @param {object} article 
 */
function removeFromCart(article) {
  //filter id and color of article to remove the good article
  cart = cart.filter((a) => a.id !== article.dataset.id || a.color !== article.dataset.color);
  saveCart(cart);
}
/**
 * change quantity of article
 * @param {Event} e 
 */
function changeQuantity(e) {
  const inputQuantity = e.target;
  const article = inputQuantity.closest("article");
  console.log(e);
  let findProduct = cart.find((a) => a.id === article.dataset.id && a.color === article.dataset.color);
  if (findProduct != undefined) {
    findProduct.quantity = Number(inputQuantity.value);
    if (inputQuantity.value <= 0) {
      removeFromCart(article)
    }
    saveCart(cart);
    //refresh
    getProductData();
  }
}


/**
 * get the total of products
 * @param {object} cart 
 * @returns number
 */
function getTotalProducts(cart) {
  cart = getCart();
  for (let product of cart) {
    totalProducts += product.quantity;
  }
  document.querySelector("#totalQuantity").innerHTML = `${totalProducts}`
  return totalProducts;
}

/**
 * sum of prices
 * @param {object} product 
 * @returns number
 */
async function getTotalPrice(product) {
  totalPrice += product.quantity * product.price;
  document.querySelector("#totalPrice").innerHTML = `${totalPrice}`
  return totalPrice
}


// get order

const inputFirstName = document.querySelector("#firstName");
const inputName = document.querySelector("#lastName");
const inputAddress = document.querySelector("#address");
const inputCity = document.querySelector("#city");
const inputEmail = document.querySelector("#email");
const regexText = /^[a-zA-Z]*$/;
const regexAddress = /[A-Za-z0-9'\.\-\s\,]/;
const regexEmail = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

/**
 * check if value is true or false so if the texte is valid
 * @param {string} value 
 * @returns boolean
 */
function isTextValid(value) {
  if (value.search(regexText) !== 0) {
    return false;
  } else {
    return true;
  }
}
/**
 * check if value is true or false so if adress is valid
 * @param {object} value 
 * @returns 
 */
function isAdressValid(value) {
  if (value.search(regexAddress) !== 0) {
    return false;
  } else {
    return true;
  }
}
/**
 * check if value is true or false so if email is valid
 * @param {object} value 
 * @returns 
 */
function isEmailValid(value) {
  if (value.search(regexEmail) !== 0) {
    return false;
  } else {
    return true;
  }
}

inputFirstName.addEventListener("input", (e) => {
  if (!isTextValid(e.target.value)) {
    document.querySelector("#firstNameErrorMsg").innerHTML = "Le prénom doit contenir au moins 2 caractères et pas de chiffres.";
  } else {
    document.querySelector("#firstNameErrorMsg").innerHTML = "";
  }
})

inputName.addEventListener("input", (e) => {
  if (!isTextValid(e.target.value)) {
    document.querySelector("#lastNameErrorMsg").innerHTML = "Le nom doit contenir au moins 2 caractères et pas de chiffres.";
  } else {
    document.querySelector("#lastNameErrorMsg").innerHTML = "";

  }
})

inputAddress.addEventListener("input", (e) => {
  if (!isAdressValid(e.target.value)) {
    document.querySelector("#addressErrorMsg").innerHTML = "Entrez une adresse valide";
  } else {
    document.querySelector("#addressErrorMsg").innerHTML = "";
  }
})

inputCity.addEventListener("input", (e) => {
  if (!isTextValid(e.target.value)) {
    document.querySelector("#cityErrorMsg").innerHTML = "Renseignez le nom de votre ville.";
  } else {
    document.querySelector("#cityErrorMsg").innerHTML = "";
  }
})

inputEmail.addEventListener("input", (e) => {
  if (!isEmailValid(e.target.value)) {
    document.querySelector("#emailErrorMsg").innerHTML = "Entrez une adresse email valide.";
  } else {
    document.querySelector("#emailErrorMsg").innerHTML = "";
  }
})

const form = document.querySelector(".cart__order__form");

/**
 * post data to the api
 * @param {object} body 
 * @returns 
 */
async function postBody(body) {
  try {
    const response = await fetch('http://localhost:3000/api/products/order', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    const data = await response.json();
    return data;
  }
  catch (e) {
    alert("Problème de connexion au serveur.")
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!cart.length) {
    alert("Votre panier est vide !")
    return
  }
  if (isTextValid(firstName.value) && isTextValid(lastName.value) && isAdressValid(address.value) && isTextValid(city.value) && isEmailValid(email.value)) {
    const contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    }
    const products = [];
    for (const product of cart) {
      products.push(product.id)
    }
    const body = { contact, products };
    const postOk = await postBody(body);


    if (postOk) {
      window.location.href = `./confirmation.html?orderId=${postOk.orderId}`;
    }
  } else {
    alert("Le formulaire n'est pas correctement rempli.")
  }
})

