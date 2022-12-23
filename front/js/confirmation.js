function init(params) {
    document.querySelector("#orderId").innerHTML = getOrderId();
    clearCart();
}
init()

function getOrderId() {
    return new URL(location.href).searchParams.get("orderId");
}


function clearCart() {
    localStorage.clear();
}