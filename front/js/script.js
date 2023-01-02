/**
 * initial function
 * order function
 */
async function init() {
    const catalog = await getCatalog()
    displayProduct(catalog);
}
init();

/**
 * fetch the catalog from API
 * @returns Array
 */
async function getCatalog() {
    // call the API as a promise with fetch (async/await method) and stock in const
    const response = await fetch(`http://localhost:3000/api/products`);

    // What happen if response is false
    if (!response.ok) {
        document.getElementById("items").innerHTML = "<h3>Bientôt de retour !</h3>";
    }

    // stock catalog in const to await a response in json format
    const catalog = await response.json();
    // return const
    return catalog
}

/**
 * display products on homepage
 * @param {Array} catalog 
 */
async function displayProduct(catalog) {
    // browse all products of array catalog one by one
    for (let products of catalog) {
        // Dom manipulation
        document
            //select id
            .querySelector("#items")
            // add HTML
            .innerHTML +=
            `<a href="./product.html?id=${products._id}">
                    <article>
                        <img src="${products.imageUrl}" alt="${products.altTxt}">
                        <h3 class="productName">${products.name}</h3>
                        <p class="productDescription">${products.description}</p>
                    </article>
                    </a>`;
    }

}

