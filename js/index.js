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


function cutString(string, limit) {
  if(string.length > limit){
      return string.slice(0, limit - 1)+"..."
  } else{
      return string
  }; 
};

document.addEventListener("DOMContentLoaded", validar() );
// Verificar si el usuario está logueado
function validar(){
    const isLoggedIn = localStorage.getItem("isLoggedIn"); //definimos la constante "isLoggedIn" para acceder mas fácilmente a ella
    if (!isLoggedIn || isLoggedIn === "false") { /*La funcionalidad no se implementaba correctamente, ya que al refrescar la página, aún con isLoggedIn=falso, seguía siendo visible
                                                 el menú "Cuenta" y no redirigía a login.html. El problema radicaba en que el sistema no interpretaba correctamente "!isLoggedIn", 
                                                 por lo que agregar la condición "isLoggedIn === "false" solucionó el problema.*/
    dropbtn.style.display = "none"; //Si no se está logeado (es decir, si "isLoggedIn" es falso), ocultamos el menu Cuenta
    
    window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    } else if (nombreUsuario === 'Invitado') { // Si el nombre de usuario es "Invitado"
      dropbtn.innerHTML = 'Login'; // Se cambia el contenido del menú de usuario a un enlace a Login
      dropbtn.setAttribute('href', 'login.html');
      menu.remove(); // Se elimina el menú desplegable
      welcome(); // Y se muestra aviso de bienvenida
    } else { // En caso de no cumplirse ninguna de las condiciones anteriores, significa que el usuario está logueado con su cuenta, por lo que
      welcome(); // Se muestra aviso de bienvenida
      dropbtn.innerHTML += cutString(nombreUsuario, 20) + `<i class="fas fa-caret-down m-2"></i>`; // Y se cambia el contenido del menú desplegable al nombre del usuario.
      menu.style.minWidth = nombreUsuario.length < 20 ?`${nombreUsuario.length}em` :`20em`; // Opcional, ajusta el ancho mínimo del menú desplegable al largo del nombre de usuario, para que en caso de un nombre de usuario largo el menú no se vea demasiado pequeño en comparación.
    };
};

  dropbtn.addEventListener("mouseover", function(event) { //indicamos que al pasar con el mouse sobre el elemento dropbtn, los elementos "menu" se vuelvan visibles.
    event.stopPropagation();
    menu.style.display = "block";
  });
  
  account.addEventListener("mouseleave", function(event) { //indicamos que cuando el mouse abandone cualquier elemento dentro del elemento <li> en el que está el menú de usuario, estos dejen de estar visibles.
    event.stopPropagation();
    menu.style.display = "none";
  });
  
function cerrarSesion(event) { //creamos una función que registre en el almacenamiento del navegador que la sesión está cerrada.
    event.preventDefault(); //Evitamos el comportamiento por defecto del elemento, que al tratarse de un enlace con el atributo href="#", nos redireccionaría hacia /#
    localStorage.setItem('isLoggedIn', 'false'); //indicamos que la sesión está cerrada
    localStorage.removeItem('user'); // Eliminamos el dato guardado para que al volver a loguearse o registrarse pueda guardar uno nuevo
    validar(); //invocamos la función validar para que se oculte el elemento con el menu y nos redireccione al login sin necesidad de refrescar la página.
}

  salir.addEventListener("click", cerrarSesion); //agregamos un manejador de eventos para cuando se hace click en "Salir", que ejecuta la función cerrarSesion.

  

  function welcome() { //función que muestra alerta de bienvenida
    if (document.referrer.endsWith('login.html')){
      document.getElementById("alert-success").classList.add("show"); //añadimos la clase show a la alerta para que se vuelva visible
      document.getElementById("welcome").textContent += `Bienvenido ${nombreUsuario}!`; //accedemos al párrafo de id welcome para añadirle el texto deseado
      setTimeout(function() {
        document.getElementById("alert-success").classList.remove("show"); //luego de el tiempo especificado se elimina la clase show para que la alerta vuelva a estar oculta       
      }, 2000);
    }
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
