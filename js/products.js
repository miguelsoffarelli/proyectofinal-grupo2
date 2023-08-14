const categoria = localStorage.getItem('catID'); // Ya que los archivos index.js y categories.js ya incluyen la función de guardar la id de la
                                                 // categoría en localStorage, accedemos a ella
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoria + ".json"; // y reemplazamos en la url por la id de la api correspondiente
const container = document.getElementById("product-list");

function showProducts(products) {
    let htmlContentToAppend = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        htmlContentToAppend += `
        <div class="product">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h2 class="product-name">${product.name}</h2>
          <p class="product-description">${product.description}</p>
          <p class="product-cost">${product.currency} ${product.cost}</p>
          <p class="product-sold">${product.soldCount} vendidos</p>
        </div>
      `;
    };

    container.innerHTML = htmlContentToAppend;
};


async function getProducts() {
    let response = await fetch(DATA_URL);
    if (response.ok){
        let data = await response.json();
        showProducts(data.products);
    } else {
        alert("ERROR!" + response.status);
    };
};

getProducts();