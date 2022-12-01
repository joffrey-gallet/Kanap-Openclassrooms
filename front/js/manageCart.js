class Cart {
    constructor() {
        let cart = localStorage.getItem("cart");
        if (cart === null) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(cart);
        }
    }

    save() {
        localStorage.setItem("cart", JSON.stringify(this.cart))
    }

    add(product) {
        const findProduct = this.cart.find((p) => p.id === product.id && p.color === product.color);

        if (findProduct !== undefined) {
            findProduct.quantity++;
        } else {
            this.cart.push(product);
            //console.log(cart);
        }
        this.save();
    }

    remove(product) {
        this.cart = this.cart.filter((p) => p.id !== product.id && p.color === product.color);
        this.save();
    }

    changeQuantity(product, quantity) {
        let findProduct = this.cart.find((p) => p.id === product.id && p.color === product.color);
        if (findProduct != undefined) {
            findProduct.quantity = quantity;
            if (quantity <= 0) {
                removeFromCart(product);
            } else {
                this.save();
            }
        }
    }

    getTotalProducts() {
        let totalProducts = 0;
        for (let product of this.cart) {
            totalProducts += product.quantity;
        }
        document.querySelector("#totalQuantity").innerHTML = `${totalProducts}`
        return totalProducts;
    }

    getTotalPrice() {
        let totalPrice = 0;
        for (let product of this.cart) {
            totalPrice += product.quantity * product.price;
        }
        document.querySelector("#totalPrice").innerHTML = `${totalPrice}`
        console.log(totalPrice);
        return totalPrice
    }
}
