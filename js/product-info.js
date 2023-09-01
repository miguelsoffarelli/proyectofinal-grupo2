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
            <div class="row">
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
            </div>
                <div class="col-5">
                    <div class="row">
                        <h1 class="display-4">${data.name}</h1>
                    </div>
                    <div class="row">
                        <p class="h2">${data.currency}${data.cost}</p>
                    </div>
                    <div class="row">
                        <p>${data.soldCount} vendidos</p>
                    </div>
                </div>
            </div>
            `
    container.innerHTML = htmlContentToAppend;
};

window.addEventListener('load', () => {
    fetchData(showProduct);  
  });