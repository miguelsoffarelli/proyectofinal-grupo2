const idProducto = localStorage.getItem("prodID");
const CURRENT_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/products/" + idProducto + ".json";
const container = document.getElementById("product-info");
let currentProductArray = [];

function fetchData(funcion) {
  try {
    return fetch(CURRENT_PRODUCT_URL)
      .then((response) => response.json())
      .then((data) => {
        funcion(data);
      });
  } catch {
    alert("ERROR!" + response.status);
  }
}

function currencyConverter(data) {
  let price = data.cost;
  if (data.currency === "USD") {
    price = price * 38;
    return price;
  }
  return price;
}

function showProduct(data) {
  let htmlContentToAppend = "";
  htmlContentToAppend = `
            <div class="row m-4">
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
            <div class="row m-4">
                <div class="col-7">
                  <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                      <li data-target="#carouselExampleIndicators2" data-slide-to="0" class="active"></li>
                      <li data-target="#carouselExampleIndicators2" data-slide-to="1"></li>
                      <li data-target="#carouselExampleIndicators2" data-slide-to="2"></li>
                      <li data-target="#carouselExampleIndicators2" data-slide-to="3"></li>
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
            
          
                <div class="col-4 card" style="border-color: white">
                    <div class="row card-title">
                        <h1 class="display-5 fw-normal">${data.name}
                        </h1>
                        
                    </div>
                    <sub class="fs-6 fw-lighter" style="color: #514F4F" id="sold">${
                      data.soldCount
                    } vendidos</sub>
                    <div class="row card-text">
                        <p class="h2 fw-light">${data.currency} ${data.cost}</p>
                    </div>
                    <div class="row mb-0">
                        <p class="fs-5">En 12x $ ${(
                          currencyConverter(data) / 12
                        ).toFixed(
                          2
                        )} sin interés<i class="far fa-question-circle text-muted m-2" title="Lo pagás en pesos uruguayos!"></i></p>
                    </div>
                    <div class="row mt-3">
                      <button type="button" class="btn btn-primary btn-lg">Comprar!</button>
                    </div>
                    <div class="row col-11 mx-auto mt-2">
                      <button type="button" class="btn btn-outline-success">Añadir al carrito</button>
                    </div>
                    
                </div>
                <div class="col m-4">
                    <div class="row">
                        <i class="far fa-heart fa-2x" title="Añadir a favoritos"></i>
                    </div>
                </div>
              </div>
              <div class="row m-5">
                <div class="accordion accordion-flush" id="descriptionAccordion">
                  <div class="accordion-item">
                    <h2 class="accordion-header mb-4" id="headingOne" style="color: #514F4F">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Descripción del producto
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
  container.innerHTML = htmlContentToAppend;
}

window.addEventListener("load", () => {
  fetchData(showProduct);
});
