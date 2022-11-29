
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart === null) {
        return []
    } else {
        return JSON.parse(cart)
    }
}

const cart = getCart();

getProduct();

/**
 * get product data
 * @param {object} productData
 */
async function getProduct() {
    for (const productLs of cart) {
        const response = await fetch(`http://localhost:3000/api/products/${productLs.id}`);
        const product = await response.json();
        const productData = {
            ...product,
            ...productLs
        }
        //console.log(productData);
        displayProduct(productData)
        
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



