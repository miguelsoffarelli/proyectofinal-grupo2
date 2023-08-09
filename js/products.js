const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
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
    }

    container.innerHTML = htmlContentToAppend;
}


async function getProducts() {
    let response = await fetch(DATA_URL);
    if (response.ok){
        let data = await response.json();
        showProducts(data.products);
    } else {
        alert("ERROR!" + response.status);
    }
};

getProducts();