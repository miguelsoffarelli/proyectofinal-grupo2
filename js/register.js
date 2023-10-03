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

// Event Listener que valida los datos ingresados y, en caso positivo los guarda e inicia sesión, o de lo contrario muestra alerta de error
regbtn.addEventListener('click', (e)=> { 
    e.preventDefault()
    if (fname.value !== "" && lname.value !=="" && usuario.value !== "" && pass1.value !== "" && pass2.value && pass1.value.length >= 6 && email.value !== ""){ 
        localStorage.setItem("user", usuario.value);                                                                             
        localStorage.setItem('isLoggedIn', 'true');                                                                        
        showAlertSuccess();                                                                                                
        setTimeout(function() {
            location.href = "index.html"                                                                                   
        }, 2000);                                                                                                                                                                                                       
    } else {                                                                                                               
        showAlertError()                                                                                                         
    };
});

// Función que muestra la alerta de error
function showAlertError() { 
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-danger").reset;
        location.reload();
    }, 2000);
};

// Función que muestra la alerta de éxito
function showAlertSuccess() { 
    document.getElementById("alert-success").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-success").reset;
    }, 2000);
};


// Event Listeners para elementos de la navbar (ya que en esta página no se utiliza el script account.js ni el index.js) //TODO Intentar juntar los event listeners en una función y llamarla cuando sea necesario (en account.js, index.js y aquí)
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

  