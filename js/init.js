const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

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

// ---------------------------------------------------------- //

const reproductor = document.getElementById("reproductor");
const btnReproducir = document.getElementById("btnReproducir");
const btnPausa = document.getElementById("btnPausa");
let reproduciendoAntes = false; // Variable para almacenar el estado de reproducción

    // Almacenar la posición y estado de reproducción antes de cambiar de página
    window.onbeforeunload = () => {
      localStorage.setItem("posicionReproductor", reproductor.currentTime);
      localStorage.setItem("reproduciendoAntes", reproductor.paused ? "no" : "si");
    };

    // Restaurar la posición y estado de reproducción al cargar la página
    window.onload = () => {
      const posicionGuardada = localStorage.getItem("posicionReproductor");
      const reproduciendo = localStorage.getItem("reproduciendoAntes");
      
      if (posicionGuardada) {
        reproductor.currentTime = parseFloat(posicionGuardada);
        reproduciendoAntes = reproduciendo === "si"; // Actualizar el estado de reproducción
      }
      
      if (reproduciendoAntes) {
        reproductor.play(); // Reanudar la reproducción si estaba en reproducción antes
      }
    };

    btnReproducir.addEventListener("click", () => {
      reproductor.play();
      reproduciendoAntes = true; // Actualizar el estado de reproducción
    });

    btnPausa.addEventListener("click", () => {
      reproductor.pause();
      reproduciendoAntes = false; // Actualizar el estado de reproducción
    });