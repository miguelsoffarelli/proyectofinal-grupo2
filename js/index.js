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
      dropbtn.innerHTML = 'Login'; 
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

document.addEventListener("DOMContentLoaded", validar() );

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
