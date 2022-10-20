

fetch(`http://localhost:3000/api/products`)
    .then((response) => response.json())
    .then((data) => {
        for (let products of data) {
            document
            .getElementById("items")
            .innerHTML += 
            `<a href="./product.html?id=${products._id}">
            <article>
                <img src="${products.imageUrl}" alt="${products.altTxt}">
                <h3 class="productName">${products.name}</h3>
                <p class="productDescription">${products.description}</p>
            </article>
            </a>`;
        }
    });
