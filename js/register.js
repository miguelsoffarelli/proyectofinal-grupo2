const regbtn = document.getElementById("boton_registrarse"); //llamamos al botón de registro
const usuario = document.getElementById("uName");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const email = document.getElementById("email");
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


regbtn.addEventListener('click', (e)=> { //añadimos un manejador de eventos para click
    e.preventDefault()
    if (fname.value !== "" && lname.value !=="" && usuario.value !== "" && pass1.value !== "" && pass2.value && pass1.value.length >= 6 && email.value !== ""){ //si se cumplen estas condiciones 
        localStorage.setItem("user", usuario.value);                                                                             //se guardan los datos en localStorage
        localStorage.setItem('isLoggedIn', 'true');                                                                        //se guarda la sesión 
        showAlertSuccess();                                                                                                //se muestra alerta de éxito
        setTimeout(function() {
            location.href = "index.html"                                                                                   //y se redirecciona a la página principal
        }, 2000);                                                                                                                                                                                                       
    } else {                                                                                                               //de lo contrario
        showAlertError()                                                                                                   //se muestra la alerta        
    };
});

function showAlertError() { //función que muestra la alerta
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-danger").reset;
        location.reload();
    }, 2000);
};

function showAlertSuccess() { //función que muestra la alerta
    document.getElementById("alert-success").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-success").reset;
    }, 2000);
};

SETTINGS_DROPBTN.addEventListener("mouseover", function(event) { //indicamos que al pasar con el mouse sobre el elemento dropbtn, los elementos "menu" se vuelvan visibles.
    event.stopPropagation();
    SETTINGS_MENU.style.display = "block";
  });
    
  SETTINGS.addEventListener("mouseleave", function(event) { //indicamos que cuando el mouse abandone los elementos menu, estos dejen de estar visibles.
    event.stopPropagation();
    SETTINGS_MENU.style.display = "none";
  });
  
  LANGUAGE_DROPBTN.addEventListener("mouseover", function(event) { //indicamos que al pasar con el mouse sobre el elemento dropbtn, los elementos "menu" se vuelvan visibles.
    event.stopPropagation();
    LANGUAGE_MENU.style.display = "block";
  });
    
  LANGUAGE_DIV.addEventListener("mouseleave", function(event) { //indicamos que cuando el mouse abandone los elementos menu, estos dejen de estar visibles.
    event.stopPropagation();
    LANGUAGE_MENU.style.display = "none";
  });
  
  CURRENCY_DROPBTN.addEventListener("mouseover", function(event) { //indicamos que al pasar con el mouse sobre el elemento dropbtn, los elementos "menu" se vuelvan visibles.
    event.stopPropagation();
    CURRENCY_MENU.style.display = "block";
  });
    
  CURRENCY_DIV.addEventListener("mouseleave", function(event) { //indicamos que cuando el mouse abandone los elementos menu, estos dejen de estar visibles.
    event.stopPropagation();
    CURRENCY_MENU.style.display = "none";
  });
  
  BTN_MODE.addEventListener("click", ()=> {
    BODY.classList.toggle("darkMode");
  });

  