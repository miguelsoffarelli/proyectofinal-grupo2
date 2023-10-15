const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const CART_BUTTON = document.getElementById("shopping-cart");



let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Fetch---------------------------------------------------------
function fetchData(funcion, url) {
  try {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      funcion(data);
    })
  } catch {
    console.log("Error");
  };
};

// Función para limitar la cantidad de caracteres que se muestran----------------------
function cutString(string, limit) {
  if(string.length > limit){
      return string.slice(0, limit - 1)+"..."
  } else{
      return string
  }; 
};


// Función para descontar un porcentaje
function percentage(num, per) {
  return num - ((num/100)*per);
};


// Función para saber si un producto está en oferta (para así aplicar el descuento en products.html y product-info.html)
function hasDiscount(id, price) {
  const sessionProducts = JSON.parse(sessionStorage.getItem('sessionProducts'));
  const productsArray = Object.values(sessionProducts);
  const product = productsArray.find(prod => prod.id === id);
  if (product) {
    return percentage(price, 10);
  } else {
    return price;
  };
};


// Función para asignar id del producto al localStorage---------------------------------------------------------------
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
};

// Función para asignar categoría del producto al localStorage 
// sin redireccionar (para acceder a un producto fuera de products.html)---------------------------------------------------------------
function setCatID(id) {
  localStorage.setItem("catID", id);
};

// ---------------------------------------------------------- //

const MUSIC_PLAYER = document.getElementById("reproductor");
let playingBefore = false; // Variable para almacenar el estado de reproducción
MUSIC_PLAYER.volume = 0.5

// Detectar cuando el usuario está abandonando la página
window.addEventListener("unload", () => {
  sessionStorage.setItem("posicionReproductor", MUSIC_PLAYER.currentTime);
  sessionStorage.setItem("reproduciendoAntes", MUSIC_PLAYER.paused ? "no" : "si");
});

// Comprobar el estado de reproducción al cargar una nueva página o al retroceder
window.addEventListener("DOMContentLoaded", () => {
  const SAVED_POSITION = sessionStorage.getItem("posicionReproductor");
  const PLAYING = sessionStorage.getItem("reproduciendoAntes");
  
  if (SAVED_POSITION) {
    MUSIC_PLAYER.currentTime = parseFloat(SAVED_POSITION);
    playingBefore = PLAYING === "si"; // Actualiza el estado de reproducción
  }
  
  if (playingBefore) {
    MUSIC_PLAYER.play(); // Reanuda la reproducción si se estaba en reproducción antes
  }
});


CART_BUTTON.onclick = () => {
  window.location = "cart.html";
};


//------------------------------------ CONVERSOR DE MONEDA ------------------------------------//

let selectedCur = localStorage.getItem('selectedCur');


function getExchangeRate(prodCur) {
  selectedCur === null ?selectedCur = prodCur.toUpperCase() :selectedCur = selectedCur;
  return new Promise((resolve, reject) => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectedCur.toLowerCase()}/${prodCur.toLowerCase()}.json`)
      .then(response => response.json())
      .then(result => { 
        if(prodCur === 'usd'){
          const exchangeRate = result.usd;
          resolve(exchangeRate);
        } else if(prodCur === 'uyu'){
          const exchangeRate = result.uyu;
          resolve(exchangeRate);
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};


