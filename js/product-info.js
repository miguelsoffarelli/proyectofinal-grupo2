const idProducto = localStorage.getItem('prodID');
const CURRENT_PRODUCT_URL = "https://japceibal.github.io/emercado-api/products/" + idProducto + ".json";
const container = document.getElementById('product-info');
let currentProductArray = [];

function fetchData(funcion) {
    try {
      return fetch(CURRENT_PRODUCT_URL)
      .then(response => response.json())
      .then(data => {
        funcion(data);
      })
    } catch {
      alert("ERROR!" + response.status);
    };
  };


function showProduct(data){
    let htmlContentToAppend = "";
    htmlContentToAppend = `
            <div class="row m-4">
                <p class="font-monospace text-muted user-select-none">
                    <a href="products.html" class="text-decoration-none fw-bold" style="color: black">Volver</a>
                     | <a href="index.html" class="text-decoration-none" style="color: grey">e-Mercado</a>
                     &gt; <a href="categories.html" class="text-decoration-none" style="color: grey">Categorías</a>
                     &gt; <a href="products.html" class="text-decoration-none" style="color: grey">${data.category}</a>
                     &gt; <a href="product-info.html" class="text-decoration-none" style="color: grey">${data.name}</a>
                </p>
            </div>
            <div class="row m-4">
                <div class="col-7">
                    <div id="prodImg" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-item active" data-bs-interval="2000"> 
                            <img src="${data.images[0]}" class="d-block w-100"> 
                        </div> 
                        <div class="carousel-item" data-bs-interval="2000"> 
                            <img src="${data.images[1]}" class="d-block w-100"> 
                        </div> 
                        <div class="carousel-item" data-bs-interval="2000"> 
                            <img src="${data.images[2]}" class="d-block w-100"> 
                        </div> 
                        <div class="carousel-item" data-bs-interval="2000"> 
                            <img src="${data.images[3]}" class="d-block w-100"> 
                        </div> 
                    </div> 
                    <button class="carousel-control-prev" type="button" data-bs-target="#prodImg" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#prodImg" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="col-4">
                    <div class="row">
                        <h1 class="display-4 fw-normal">${data.name}</h1>
                    </div>
                    <div class="row">
                        <p class="h1 fw-light">${data.currency} ${data.cost}</p>
                    </div>
                    <div class="row">
                        <p class="fs-5">En 12x $ ${(data.cost * 38) / 12} sin interés<i class="far fa-question-circle text-muted m-2" title="Lo pagás en pesos uruguayos!"></i></p>
                    </div>
                    <div class="row">
                        <p class="fw-lighter">${data.soldCount} vendidos</p>
                    </div>
                </div>
                <div class="col m-4">
                    <div class="row">
                        <i class="far fa-heart fa-2x" title="Añadir a favoritos"></i>
                    </div>
                </div>
            </div>
            <div class="row m-5">
                <p class="fs-5">${data.description}</p>
            </div>
                
            `
    container.innerHTML = htmlContentToAppend;
};

window.addEventListener('load', () => {
    fetchData(showProduct);  
  });