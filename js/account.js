const LOGOUT = document.getElementById("exit");
const DROPBTN = document.getElementById("nav-dropbtn");
const MENU = document.getElementById("menu");
const USERNAME = localStorage.getItem('user'); 
const ACCOUNT = document.getElementById('accountDropdown');
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
const UYU = document.getElementById('uy');
const USD = document.getElementById('us');
const BRL = document.getElementById('br');
const EUR = document.getElementById('eu');
const ARS = document.getElementById('ar');
const GBP = document.getElementById('gb');
const avatarContainer = document.getElementById("avatarContainer");


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
    DROPBTN.style.display = "none"; 
    window.location.href = 'login.html'; 
    } else if (USERNAME === 'Invitado') {
      DROPBTN.innerHTML = 'Iniciar Sesión';
      DROPBTN.setAttribute('href', 'login.html');
      MENU.remove();
    } else {
      avatarContainer.innerHTML = `<div id="avatarContainer"><img id="avatar" src="${localStorage.getItem("userPic")}"></div>`
      DROPBTN.innerHTML += cutString(USERNAME, 12) + `<i class="fas fa-caret-down m-2"></i>`; 
      MENU.style.minWidth = USERNAME.length < 12 ?`${USERNAME.length}em` :`15em`; 
    };
};


// Event Listeners--------------------------------------------------------------------------------------------------
LOGOUT.addEventListener("click", cerrarSesion); 

document.addEventListener("DOMContentLoaded", validar() );

DROPBTN.addEventListener("mouseover", function(event) { 
  event.stopPropagation();
  MENU.style.display = "block";
});
  
ACCOUNT.addEventListener("mouseleave", function(event) { 
  event.stopPropagation();
  MENU.style.display = "none";
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

UYU.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCur', 'UYU');
  window.location.reload();
})

USD.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCur', 'USD');
  location.reload();
})

BRL.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCur', 'BRL');
  location.reload();
})

EUR.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCur', 'EUR');
  location.reload();
})

ARS.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCur', 'ARS');
  location.reload();
})

GBP.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCur', 'GBP');
  window.location.href = location;
  location.reload();
})
