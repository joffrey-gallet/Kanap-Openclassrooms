let totalProducts = 0;
let totalPrice = 0;

function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    return []
  } else {
    return JSON.parse(cart)
  }
}

let cart = getCart();


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
  document.querySelector("#cart__items").innerHTML = "";
  for (const productLs of cart) {
    const response = await fetch(`http://localhost:3000/api/products/${productLs.id}`);
    const product = await response.json();

    let productData = {
      ...product,
      ...productLs
    }
    //console.log(productData);
    displayProduct(productData);
    getTotalPrice(productData);
  }
  getTotalProducts();
}

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

  const deleteItems = document.querySelectorAll(".deleteItem");
  for (const deleteButton of deleteItems) {
    deleteButton.addEventListener("click", (e) => {
      const button = e.target
      const article = button.closest("article");
      removeFromCart(article);
    })
  }

  const itemQuantity = document.querySelectorAll(".itemQuantity");
  for (const inputQuantity of itemQuantity) {
    inputQuantity.addEventListener("change", (e) => {
      changeQuantity(e);
    })
  }
}

function removeFromCart(article) {
  cart = cart.filter((a) => a.id !== article.dataset.id || a.color !== article.dataset.color);
  saveCart(cart);
}

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
    getProductData();
  }
}



function getTotalProducts(cart) {
  cart = getCart();
  for (let product of cart) {
    totalProducts += product.quantity;
  }
  document.querySelector("#totalQuantity").innerHTML = `${totalProducts}`
  return totalProducts;
}


async function getTotalPrice(product) {
  totalPrice += product.quantity * product.price;
  document.querySelector("#totalPrice").innerHTML = `${totalPrice}`
  //console.log(totalPrice);
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


function isTextValid(value) {
  if (value.search(regexText) !== 0) {
    return false;
  } else {
    return true;
  }
}

function isAdressValid(value) {
  if (value.search(regexAddress) !== 0) {
    return false;
  } else {
    return true;
  }
}

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

async function postBody(body) {
  const response = await fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  const data = await response.json();
  /*if (data) {
    console.log(data);
    return true
  } else {
    return false;
  }*/
  return data;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
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
    //console.log(products);
    const body = { contact, products };
    const postOk = await postBody(body);


    if (postOk) {
      window.location.href = `./confirmation.html?orderId=${postOk.orderId}`;
      console.log(postOk);
    }
    else {
      console.log('not ok');
    }
  }
})

