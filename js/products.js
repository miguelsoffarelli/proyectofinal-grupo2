function showProducts(products) {
    let htmlContentToAppend = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        htmlContentToAppend += `
        <div class="container list-group">
        <div class="product row m-4 ">
        <div class="col-3 list-group-item d-flex justify-content-between">
          <img src="${product.image}" alt="${product.name}" class="product-image img-thumbnail">
        </div>
        <div class="col-7">
          <h2 class="product-name">${product.name}</h2>
          <p class="product-description">${product.description}</p>
          <p class="product-cost">${product.currency} ${product.cost}</p>
        </div>
        <div class="col-2 text-muted">
          <p class="product-sold">${product.soldCount} vendidos</p>
        </div>
        </div>
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
    };
};

getProducts();