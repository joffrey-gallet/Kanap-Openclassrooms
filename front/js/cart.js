
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
      removeFromCart(e);
    })
  }

  const itemQuantity = document.querySelectorAll(".itemQuantity");
  for (const inputQuantity of itemQuantity) {
    inputQuantity.addEventListener("change", (e) => {
      changeQuantity(e);
    })
  }
}

function removeFromCart(e) {
  //console.log(e);
  const button = e.target
  const article = button.closest("article");
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
      removeFromCart(product);
    } else {
      saveCart(cart);
    }
    getProductData();
  }
}


getTotalProducts();

function getTotalProducts(cart) {
  cart = getCart();
  let totalProducts = 0;
  for (let product of cart) {
    totalProducts += product.quantity;
  }
  document.querySelector("#totalQuantity").innerHTML = `${totalProducts}`
  return totalProducts;
}



let totalPrice = 0;
async function getTotalPrice(product) {
  totalPrice += product.quantity * product.price;
  document.querySelector("#totalPrice").innerHTML = `${totalPrice}`
  //console.log(totalPrice);
  return totalPrice
}


// get order

document.querySelector("#order").addEventListener("click", (e) => {
  e.preventDefault();
  const fields = document.querySelectorAll(".cart__order__form input");
  let isValid = true;
  for (const field of fields) {
    isValid &= check(field);
    if (!isValid) {
      break;
    }
  }
  if (isValid) {
    console.log("ok");
  }
})

function checkForm(input) {
  return input.reportValidity();
}