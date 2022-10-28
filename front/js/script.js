/**
 * initial function
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
    const response = await fetch(`http://localhost:3000/api/products`);
    /*if (!response.ok) {
        document
        .getElementById("items")
        .innerHTML = "<h3>bientôt de retour !</h3>";
    }*/
    const catalog = await response.json()
    return catalog
}
/**
 * display products on homepage
 * @param {Array} catalog 
 */
async function displayProduct(catalog) {
    for (let product of catalog) {
        document
            .getElementById("items")
            .innerHTML +=
            `<a href="./product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                    </article>
                    </a>`;
    }

}

