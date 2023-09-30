document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("herramientas").addEventListener("click", function() {
        localStorage.setItem("catID", 104);
        window.location = "products.html"
  });
    document.getElementById("computadoras").addEventListener("click", function() {
        localStorage.setItem("catID", 105);
        window.location = "products.html"
    });
    document.getElementById("vestimenta").addEventListener("click", function() {
        localStorage.setItem("catID", 106);
        window.location = "products.html"
    });
    document.getElementById("electrodomesticos").addEventListener("click", function() {
        localStorage.setItem("catID", 107);
        window.location = "products.html"
    });
    document.getElementById("deporte").addEventListener("click", function() {
        localStorage.setItem("catID", 108);
        window.location = "products.html"
    });
    document.getElementById("celulares").addEventListener("click", function() {
        localStorage.setItem("catID", 109);
        window.location = "products.html"
    });
});

const salir = document.getElementById("exit");
const dropbtn = document.getElementById("nav-dropbtn");
const menu = document.getElementById("menu");
const nombreUsuario = localStorage.getItem('user'); //accedemos al valor almacenado en el local storage para la clave user (ver register.js, el valor es usuario.value)
const enlaceLogin = document.getElementById("linkLogin");
const account = document.getElementById('accountDropdown');
const BODY = document.querySelector("body");
const BTN_MODE = document.getElementById("modeBtn");
const SETTINGS = document.getElementById('settingsDropdown');
const SETTINGS_DROPBTN = document.getElementById('settings');
const SETTINGS_MENU = document.getElementById('settingsMenu');
const LANGUAGE_DROPBTN = document.getElementById('language');
const CURRENCY_DROPBTN = document.getElementById('currency');
const LANGUAGE_MENU = document.getElementById('languageMenu');
const CURRENCY_MENU = document.getElementById('currencyMenu');
const LANGUAGE_DIV = document.getElementById('languageDiv');
const CURRENCY_DIV = document.getElementById('currencyDiv');
const DISCOUNTS_CAROUSEL = document.getElementById('discounts');
let currentCategory;
let DATA_URL;
const CATEGORIES_LIST = [101, 102, 103, 104, 105, 106, 107, 108, 109];
let sessionProducts = JSON.parse(sessionStorage.getItem('sessionProducts'));
if (!sessionProducts) {
  sessionProducts = {}; // Inicializa sessionProducts como un objeto vacío si es nulo
};
let urlList = [];



// Función que hace fetch a las URL de todas las categorías
function urlListFetch(urls) {
  const fetchPromises = urls.map(url => fetch(url));
  return Promise.all(fetchPromises)
    .then(responses => {
      return Promise.all(responses.map(response => response.json()));
    })
    .then(dataArray => {
      return dataArray;
    })
    .catch(error => {
      console.error("Error en la solicitud fetch:", error);
    });
};

// Función para mostrar un producto al azar de cada categoría con un descuento
function discount(){
  let activeElement = false;
  CATEGORIES_LIST.forEach(cat => {
    currentCategory = cat;
    DATA_URL = PRODUCTS_URL + currentCategory + EXT_TYPE;
    urlList.push(DATA_URL);
  });
  urlListFetch(urlList)
  .then(dataArray => {
    dataArray.forEach(cat => {
      let htmlContentToAppend = "";
      let products = cat.products;
      
      if (!sessionProducts[cat.catID]) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        sessionProducts[cat.catID] = randomProduct;
        sessionStorage.setItem('sessionProducts', JSON.stringify(sessionProducts));
      };
      let product = sessionProducts[cat.catID];

      if(product != null){
        if(!activeElement){
          htmlContentToAppend = `
            <div onclick="setProdID(${product.id}); setCatID(${cat.catID})" class="carousel-item active cursor-active" id="${product.name}" >
              <img class="d-block w-100" src="img/prod${product.id}_1.jpg" alt="Llévame ahí!">
              <img class="discountPer" src="img/10.png" alt="">
              <br>
              <h3 class="m-3">${product.name}</h3>
              <h5>${product.currency} ${percentage(product.cost, 10)}</h5>
              <p class="card-text">${product.description}</p>
            </div>
          `;
          activeElement = true;
          DISCOUNTS_CAROUSEL.innerHTML += htmlContentToAppend;
        } else {
          htmlContentToAppend += `
            <div onclick="setProdID(${product.id}); setCatID(${cat.catID})" class="carousel-item cursor-active" id="${product.name}" >
              <img class="d-block w-100" src="img/prod${product.id}_1.jpg" alt="Llévame ahí!">
              <img class="discountPer" src="img/10.png" alt="">
              <br>
              <h3 class="m-3">${product.name}</h3>
              <h5>${product.currency} ${percentage(product.cost, 10)}</h5>
              <p class="card-text">${product.description}</p>
            </div>
          `;
          DISCOUNTS_CAROUSEL.innerHTML += htmlContentToAppend;
        };  
      };
    });
  });
};


// Función para limitar los caracteres de un string (por ejemplo el nombre de usuario o un comentario)--------------------------
function cutString(string, limit) {
  if(string.length > limit){
      return string.slice(0, limit - 1)+"..."
  } else{
      return string
  }; 
};


// Función para validar si el usuario está logueado-------------------------------------------------------
function validar(){
    const isLoggedIn = localStorage.getItem("isLoggedIn"); 
    if (!isLoggedIn || isLoggedIn === "false") {
    dropbtn.style.display = "none";
    window.location.href = 'login.html'; 
    } else if (nombreUsuario === 'Invitado') { 
      dropbtn.innerHTML = 'Iniciar Sesión'; 
      dropbtn.setAttribute('href', 'login.html');
      menu.remove();
      welcome(); 
    } else { 
      welcome(); 
      dropbtn.innerHTML += cutString(nombreUsuario, 20) + `<i class="fas fa-caret-down m-2"></i>`; 
      menu.style.minWidth = nombreUsuario.length < 20 ?`${nombreUsuario.length}em` :`20em`; 
    };
};


// Función para cerrar sesión-----------------------------------------  
function cerrarSesion(event) { 
    event.preventDefault(); 
    localStorage.setItem('isLoggedIn', 'false'); 
    localStorage.removeItem('user'); 
    validar(); 
}

  
// Función que muestra alerta de bienvenida----------------------------------------------------------------
  function welcome() { 
    if (document.referrer.endsWith('login.html')){
      document.getElementById("alert-success").classList.add("show");
      document.getElementById("welcome").textContent += `Bienvenido ${nombreUsuario}!`;
      setTimeout(function() {
        document.getElementById("alert-success").classList.remove("show");       
      }, 2000);
    }
};



// Event Listeners--------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  validar(); 
  discount();
});

dropbtn.addEventListener("mouseover", function(event) { 
  event.stopPropagation();
  menu.style.display = "block";
});
  
account.addEventListener("mouseleave", function(event) { 
  event.stopPropagation();
  menu.style.display = "none";
});

salir.addEventListener("click", cerrarSesion);

SETTINGS_DROPBTN.addEventListener("mouseover", function(event) { 
  event.stopPropagation();
  SETTINGS_MENU.style.display = "block";
});
  
SETTINGS.addEventListener("mouseleave", function(event) { 
  event.stopPropagation();
  SETTINGS_MENU.style.display = "none";
});

LANGUAGE_DROPBTN.addEventListener("mouseover", function(event) { 
  event.stopPropagation();
  LANGUAGE_MENU.style.display = "block";
});
  
LANGUAGE_DIV.addEventListener("mouseleave", function(event) { 
  event.stopPropagation();
  LANGUAGE_MENU.style.display = "none";
});

CURRENCY_DROPBTN.addEventListener("mouseover", function(event) { 
  event.stopPropagation();
  CURRENCY_MENU.style.display = "block";
});
  
CURRENCY_DIV.addEventListener("mouseleave", function(event) { 
  event.stopPropagation();
  CURRENCY_MENU.style.display = "none";
});

BTN_MODE.addEventListener("click", ()=> {
  BODY.classList.toggle("darkMode");
});


