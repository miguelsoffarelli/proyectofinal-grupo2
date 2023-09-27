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


// Función para saber si un producto está en oferta (para así aplicar el descuento en products.js y product-info.js)
function hasDiscount(id, price) {
  const sessionProducts = JSON.parse(sessionStorage.getItem('sessionProducts'));
  for (const prod of sessionProducts) {
    if (prod && prod.id === id) {
      return percentage(price, 10);
    } else {
      return price;
    }
  }
  return price;
}


// Función para asignar id del producto al localStorage---------------------------------------------------------------
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
};

// ---------------------------------------------------------- //

const reproductor = document.getElementById("reproductor");
const btnReproducir = document.getElementById("btnReproducir");
const btnPausa = document.getElementById("btnPausa");
let reproduciendoAntes = false; // Variable para almacenar el estado de reproducción
reproductor.volume = 0.1

// Detectar cuando el usuario está abandonando la página
window.addEventListener("unload", () => {
  sessionStorage.setItem("posicionReproductor", reproductor.currentTime);
  sessionStorage.setItem("reproduciendoAntes", reproductor.paused ? "no" : "si");
});

// Comprobar el estado de reproducción al cargar una nueva página o al retroceder
window.addEventListener("DOMContentLoaded", () => {
  const posicionGuardada = sessionStorage.getItem("posicionReproductor");
  const reproduciendo = sessionStorage.getItem("reproduciendoAntes");
  
  if (posicionGuardada) {
    reproductor.currentTime = parseFloat(posicionGuardada);
    reproduciendoAntes = reproduciendo === "si"; // Actualizar el estado de reproducción
  }
  
  if (reproduciendoAntes) {
    reproductor.play(); // Reanudar la reproducción si estaba en reproducción antes
  }
});

btnReproducir.addEventListener("click", () => {
  reproductor.play();
  reproduciendoAntes = true; 
});

btnPausa.addEventListener("click", () => {
  reproductor.pause();
  reproduciendoAntes = false; 
});

CART_BUTTON.onclick = () => {
  window.location = "cart.html";
};