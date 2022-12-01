
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart === null) {
        return []
    } else {
      return JSON.parse(cart)
    }
  }
  
  let cart = getCart();
  console.log(cart);
  
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}
  
  
  getProductData();
  
  /**
   * get product data
   * @param {object} productData
   */
  async function getProductData() {
    for (const productLs of cart) {
      const response = await fetch(`http://localhost:3000/api/products/${productLs.id}`);
      const product = await response.json();

      let productData = {
        ...product,
        ...productLs
      }
      //console.log(productData);
      displayProduct(productData);
      //return productData;
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
}

function removeFromCart(product) {
  cart = cart.filter((p) => p.id !== product.id && p.color === product.color);
  saveCart(cart);
}

function changeQuantity(product, quantity) {
  let findProduct = cart.find((p) => p.id === product.id && p.color === product.color );
  if (findProduct != undefined) {
    findProduct.quantity = quantity;
    if (quantity <= 0) {
      removeFromCart(product);
    } else {
      saveCart(cart);
    }
  }
}


getTotalProducts();

function getTotalProducts(cart) {
  cart = getCart();
  let totalProducts = 0;
  for(let product of cart){
    totalProducts += product.quantity;
  }
  //console.log(totalProducts);
  document.querySelector("#totalQuantity").innerHTML = `${totalProducts}`
  return totalProducts;
}


getTotalPrice();

async function getTotalPrice(cart) {
  cart = getCart();
  
  let totalPrice = 0;
  
  for (let product in cart) {
    totalPrice += product.quantity * product.price;
  }
  document.querySelector("#totalPrice").innerHTML = `${totalPrice}`
  console.log(totalPrice);
  return totalPrice

}