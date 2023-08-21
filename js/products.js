const categoria = localStorage.getItem('catID'); // Ya que los archivos index.js y categories.js ya incluyen la función de guardar la id de la
                                                 // categoría en localStorage, accedemos a ella
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoria + ".json"; // y reemplazamos en la url por la id de la api correspondiente
const container = document.getElementById("product-list");

function showProducts(products) {
    let htmlContentToAppend = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        htmlContentToAppend += `
        <div class="container list-group m-4 producto" id="${product.name}">
        <div class="product row list-group-item d-flex justify-content-between">
        <div class="col-3">
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


/* Otra forma:

fetch(DATA_URL)
.then(respuesta => respuesta.json())
.then(data => {
    showProducts(data)
})

*/

document.addEventListener('keyup', e =>{
  if (e.target.matches("#buscador")){
    document.querySelectorAll(".producto").forEach(product =>{
      product.id.toLowerCase().includes(e.target.value.toLowerCase())
        ?product.classList.remove('filtro')
        :product.classList.add("filtro")
    })
  }
})