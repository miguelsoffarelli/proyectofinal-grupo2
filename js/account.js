const salir = document.getElementById("exit");
const dropbtn = document.getElementById("nav-dropbtn");
const menu = document.getElementById("menu");
const nombreUsuario = localStorage.getItem('user'); 
const enlaceLogin = document.getElementById("linkLogin");
const account = document.getElementById('accountDropdown');
const SETTINGS = document.getElementById('settingsDropdown');
const SETTINGS_DROPBTN = document.getElementById('settings');
const SETTINGS_MENU = document.getElementById('settingsMenu');
const LANGUAGE_DROPBTN = document.getElementById('language');
const CURRENCY_DROPBTN = document.getElementById('currency');
const LANGUAGE_MENU = document.getElementById('languageMenu');
const CURRENCY_MENU = document.getElementById('currencyMenu');
const LANGUAGE_DIV = document.getElementById('languageDiv');
const CURRENCY_DIV = document.getElementById('currencyDiv');
const BODY = document.querySelector("body");
const BTN_MODE = document.getElementById("modeBtn");


// Función para cerrar sesión-----------------------------------------------------------------------------------------------
function cerrarSesion(event) { 
    event.preventDefault(); 
    localStorage.setItem('isLoggedIn', 'false'); 
    localStorage.removeItem('user'); 
    validar();
};


// Verificar si el usuario está logueado------------------------------------------------------------------------------------
function validar(){
    const isLoggedIn = localStorage.getItem("isLoggedIn"); 
    if (!isLoggedIn || isLoggedIn === "false") { 
    dropbtn.style.display = "none"; 
    window.location.href = 'login.html'; 
    } else if (nombreUsuario === 'Invitado') {
      dropbtn.innerHTML = 'Iniciar Sesión';
      dropbtn.setAttribute('href', 'login.html');
      menu.remove();
    } else {
      dropbtn.innerHTML += cutString(nombreUsuario, 20) + `<i class="fas fa-caret-down m-2"></i>`; 
      menu.style.minWidth = nombreUsuario.length < 20 ?`${nombreUsuario.length}em` :`20em`; 
    };
};


// Event Listeners--------------------------------------------------------------------------------------------------
salir.addEventListener("click", cerrarSesion); 

document.addEventListener("DOMContentLoaded", validar() );

dropbtn.addEventListener("mouseover", function(event) { 
  event.stopPropagation();
  menu.style.display = "block";
});
  
account.addEventListener("mouseleave", function(event) { 
  event.stopPropagation();
  menu.style.display = "none";
});

SETTINGS_DROPBTN.addEventListener("mouseover", function(event) { 
  event.stopPropagation();
  SETTINGS_MENU.style.display = "block";
});
  
SETTINGS.addEventListener("mouseleave", function(event) { 
  event.stopPropagation();
  SETTINGS_MENU.style.display = "none";
});

LANGUAGE_DROPBTN.addEventListener("mouseover", function(event) {
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