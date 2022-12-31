function init(params) {
    document.querySelector("#orderId").innerHTML = getOrderId();
    clearCart();
}
init()

/**
 * get order id from post
 * @returns 
 */
function getOrderId() {
    return new URL(location.href).searchParams.get("orderId");
}

/**
 * To clear cart
 */
function clearCart() {
    localStorage.clear();
}