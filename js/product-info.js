const PROD_ID = localStorage.getItem("prodID");
const CURRENT_PRODUCT_URL = PRODUCT_INFO_URL + PROD_ID; //* Actualizado para hacer uso de las variables declaradas en init.js
const CURRENT_COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + PROD_ID;
const CONTAINER = document.getElementById("product-info");
const COMMENTS = document.getElementById("comments")
const COMMENT_TXT = document.getElementById('comentarioNuevo');
const SUBMIT_COMMENT = document.getElementById('enviarComentario');
const DATE = localStorage.getItem('DATE');
const COMMENT = localStorage.getItem('COMMENT');
const PRODUCT_ID = localStorage.getItem('prodID');
const RELATED_PRODUCTS_DIV = document.querySelector(".related");
const BUY_BTN = document.getElementById("buyBtn");
const ADD_TO_CART = document.getElementById("addToCart");
const SELECTED_STARS = document.querySelectorAll(".star");
const CURRENCY_BTNS = document.querySelectorAll('.currencyBtn');
let cartProducts = JSON.parse(sessionStorage.getItem('buyProduct'));

!Array.isArray(cartProducts) ?cartProducts = [] :cartProducts;

let unitCount = 0;

let currentProductArray = [];

let currentUser = localStorage.getItem('user');

let savedComments = JSON.parse(localStorage.getItem("comentarios")) || [];


// Función para mostrar el producto
async function showProduct(data) {
    let htmlContentToAppend = ""; 
    const exchangeRateUsd = await getExchangeRate('usd');
    const exchangeRateUyu = await getExchangeRate('uyu');

        htmlContentToAppend = `
      <div class="row p-3">
          <p class="font-monospace text-muted user-select-none">
              <a href="products.html" class="text-decoration-none fw-bold" style="color: black">Volver</a>
               | <a href="index.html" class="text-decoration-none" style="color: grey">e-Mercado</a>
               &gt; <a href="categories.html" class="text-decoration-none" style="color: grey">Categorías</a>
               &gt; <a href="products.html" class="text-decoration-none" style="color: grey">${
                 data.category
               }</a>
               &gt; <a href="product-info.html" class="text-decoration-none" style="color: grey">${
                 data.name
               }</a>
          </p>
      </div>
      <div class="card-group">
          <div class="card imagesCarousel bg-transparent" style="min-width: 25rem">
            <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators2" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators2" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators2" data-slide-to="2"></li>
              </ol>
              <div class="carousel-inner border rounded">
                <div class="carousel-item active" >
                  <img src="${data.images[0]}" class="d-block w-100">  
                </div>
                <div class="carousel-item " >
                  <img src="${data.images[1]}" class="d-block w-100">  
                </div>
                <div class="carousel-item "  >
                  <img src="${data.images[2]}" class="d-block w-100">  
                </div>
                <div class="carousel-item "  >
                  <img src="${data.images[3]}" class="d-block w-100">  
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators2" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators2" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
              
          </div>
      
    
          <div class="card productInfo bg-transparent" style="min-width: 25rem">
              <div class="card-body">
                <h1 class="card-title">${data.name}</h1>
                <sub class="card-text" style="color: #514F4F" id="sold">${data.soldCount} vendidos</sub>
                <div class="card-text">
                  <p id="prodCost" class="h2 fw-light" data-id="${data.id}" data-cur="${data.currency}" data-cost='${hasDiscount(data.id, data.cost)}'></p>
                </div>
                <div class="card-text">
                  <p class="fs-5">En 12x sin interés</p>
                </div>
                <div class="card-title">
                  <button onclick="fetchData(buyProduct, CURRENT_PRODUCT_URL)" type="button" class="btn btn-primary btn-lg" id="buyBtn" style="min-width: 100%">Comprar!</button>
                </div>
                <div class="card-text d-flex justify-content-center">
                  <button onclick="fetchData(addProduct, CURRENT_PRODUCT_URL)" type="button" class="btn btn-outline-success" id="addToCart" style="min-width: 80%">Añadir al carrito</button>
                </div>
              </div>
              <div class="col m-3">
                <div class="row">
                    <i class="far fa-heart fa-2x" title="Añadir a favoritos"></i>
                </div>
              </div>
          </div>
          
        </div>
        <div class="row mt-5" style="min-width: 25rem">
          <div class="accordion accordion-flush" id="descriptionAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header mb-4 fs-1" id="headingOne" style="color: #514F4F">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <h5>Descripción del producto</h5>
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#descriptionAccordion">
                <div class="accordion-body">
                  <p class="fs-6 ms-4 mb-4">${data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
      `;  
    
      CONTAINER.innerHTML = htmlContentToAppend;

      function updatePrice(){
        const prodCost = document.getElementById('prodCost');
        if(prodCost.dataset.cur === 'USD'){
          prodCost.textContent = `${selectedCur} ${parseInt(prodCost.dataset.cost / exchangeRateUsd).toFixed(0)}`;
        } else {
          prodCost.textContent = `${selectedCur} ${parseInt(prodCost.dataset.cost / exchangeRateUyu).toFixed(0)}`;
        };
      };

      CURRENCY_BTNS.forEach(btn => {
        btn.addEventListener('click', updatePrice);
      });
      
      updatePrice();
  
};

// Función que asigna un número de estrellas de acuerdo al puntaje que se le pasa como parámetro
function stars(userScore){
  let starsToAppend = ""
  for(let i = 0; i < userScore; i++){
    starsToAppend += `<span class="fa fa-star checked"></span>`;
  };
  for(let i = 0; i < 5 - userScore; i++){
    starsToAppend += `<span class="fa fa-star"></span>`;
  };
  return starsToAppend;
};

let SCORE = 0;
SELECTED_STARS.forEach(star => {
  star.addEventListener("click", ()=> {
    SUBMIT_COMMENT.removeAttribute('disabled');
    document.getElementById('starsWarning').textContent = "";
    SCORE = parseInt(star.value);
    console.log(SCORE);
  }); 
});

// Función que guarda los comentarios nuevos
function addedComments(){
  const NEW_COMMENT = COMMENT_TXT.value;
  const CURRENT_DATE = new Date().toLocaleString();
  savedComments = JSON.parse(localStorage.getItem("comentarios")) || [];
  const nuevoComentarioObj = {
    user: CURRENT_USER,
    score: SCORE,
    description: NEW_COMMENT,
    dateTime: CURRENT_DATE,
    ID: PRODUCT_ID,
  };  
  savedComments.push(nuevoComentarioObj);
  localStorage.setItem("comentarios", JSON.stringify(savedComments));
  COMMENT_TXT.value = "";
};


// Función que carga los comentarios
function showComments(data){
  for(let COMMENT of savedComments){
    if(COMMENT.ID === PRODUCT_ID){
    data.push(COMMENT);
    };
  };
  let htmlContentToAppend = ""; 
    for (review of data) {
      htmlContentToAppend += `
       <div class="shadow p-3 mb-3"> 
        <div class="row">
          <div class="col-md-12">
           <div class="list-group">
             <div class="list-group-item border-0">
              <div><strong><a href="#">${cutString(review.user, 20)}</a></strong>
                ${stars(review.score)}
              </div>
               <div class="box overflow-auto text-break" style="max-height: 15rem">${review.description}</div>
               <div><small> ${review.dateTime}</small></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      `};
  COMMENTS.innerHTML = htmlContentToAppend;
};


function showRelatedProducts(data) {
  const RELATED_PROD = data.relatedProducts;
  let htmlContentToAppend = "";
  for (product of RELATED_PROD){
    htmlContentToAppend += `           
      <div onclick="setProdID(${product.id})" class="card m-3 cursor-active bg-transparent">
        <img class="card-img-top" src="${product.image}"</img>
        <div class="card-body">
          <p class="card-title">${product.name}</p>
        </div>
      </div>      
    `
  };
  RELATED_PRODUCTS_DIV.innerHTML += htmlContentToAppend;
};

// Clase producto para guardar en el local storage
// y poder utilizar en el carrito-------------------------------------------------------------------------------------------
class Product {
  constructor(id, image, name, unitCost, unitCount, currency) {
    this.user = localStorage.getItem('user');
    this.id = id;
    this.image = image;
    this.name = name;
    this.unitCost = unitCost;
    this.count = unitCount;
    this.currency = currency;
  }
  
  addToCart() {
    const existingProduct = cartProducts.find(prod => prod.id === this.id);
    if (!existingProduct) {
      cartProducts.push(this);
      this.count++
    } else {
      existingProduct.count++;
    };
    sessionStorage.setItem("buyProduct", JSON.stringify(cartProducts));
  };
};


// Funciones para comprar y añadir al carrito--------------------------------
function buyProduct(data) {
  const currentProduct = new Product(data.id, data.images[0], data.name, data.cost, unitCount, data.currency);
  currentProduct.addToCart();
  window.location = "cart.html";
}

function addProduct(data) {
  const currentProduct = new Product(data.id, data.images[0], data.name, data.cost, unitCount, data.currency);
  currentProduct.addToCart();
  document.getElementById("alert-success").classList.add("show");
  setTimeout(function() {
    document.getElementById("alert-success").classList.remove("show");
  }, 2000);
};



// Event Listeners
SUBMIT_COMMENT.addEventListener("click", () => {
  addedComments();
  location.reload();
});


document.addEventListener('DOMContentLoaded', () => {
  fetchData(showProduct, CURRENT_PRODUCT_URL);
  fetchData(showComments, CURRENT_COMMENTS_URL);
  fetchData(showRelatedProducts, CURRENT_PRODUCT_URL);
});


