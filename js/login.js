const USERNAME = document.getElementById('username');
const PASSWORD = document.getElementById('contrasena');
const BUTTON_LOGIN = document.getElementById('boton_login');
const BUTTON_REGISTER = document.getElementById('boton_registro');
const SKIP_LOGIN = document.getElementById('skip');
const REMEMBER_ME_CHECKBOX = document.getElementById('rememberMe');
const SAVED_USERS = JSON.parse(localStorage.getItem("usersList"));
const INPUT_PASS = document.querySelector(".inputPass");
const SHOW_PASS_BTN = document.getElementById("showPassBtn"); 
const ICON_CONT = document.querySelector(".inputIconPassCon"); 
const ICON_PASS = document.querySelector(".iconPass"); 
const SLIDEABLE_WALL = document.querySelector(".slideableWall"); 
const BTN_REGISTER_HERE = document.getElementById('btnRegisterHere'); 
const MESSAGE = document.getElementById("mensaje"); 
const BTN_MOBILE_DEVICE = document.getElementById("btnMobileFoot"); 
const REGISTER_CONTAINER = document.querySelector(".registerContainer"); 
const REGISTER_LOGIN_BACK = document.getElementById("registerLoginBack");
const AUTH_URL = "http://localhost:3000/login";



// Función que muestra error si las credenciales son incorrectas
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-danger").classList.remove("show");
        location.reload();
    }, 2000);
};



// Event Listener que valida si las credenciales son correctas, las guarda en localStorage y valida el checkbox "recordarme" 
BUTTON_LOGIN.addEventListener('click', async (e)=> {
    e.preventDefault();
    const response = await fetch(AUTH_URL);
    const DB_USERS = await response.json();
    console.log(DB_USERS);
    let auth = false;
    const username = USERNAME.value;
    const password = PASSWORD.value;
    if(USERNAME.value, PASSWORD.value){
        if (DB_USERS.some(user => user.username === USERNAME.value) && DB_USERS.some(user => user.password === PASSWORD.value)){ // Si bien solicitamos una contraseña de 6 caracteres o más al registrarse, al loguearse permitía hacerlo con cualquier contraseña, por lo que agregamos la condición.
            if (REMEMBER_ME_CHECKBOX.checked) {
                localStorage.setItem('savedUser', USERNAME.value);
                localStorage.setItem('savedPassword', PASSWORD.value);
            } else {
                localStorage.removeItem('savedUser');
                localStorage.removeItem('savedPassword');
            }
            auth = true;
            const postOptions = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password, auth }),
              };
            try {
              const response = await fetch(AUTH_URL, postOptions);
              const data = await response.json();
              console.log(data.token);
              localStorage.setItem('token', data.token);
            } catch {
              console.error(error);
            };  
            localStorage.setItem('user', USERNAME.value);
            localStorage.setItem('isLoggedIn', 'true');
            location.href = "index.html";
        } else {
            document.getElementById('alertMessage').innerHTML = "Credenciales inválidas. Chequea tu contraseña o regístrate si aún no lo estás.";
            showAlertError();
        }
    } else {
        showAlertError();

    };
});


// Event Listeners
/*
saltarLogin.addEventListener('click', (e)=> {
    e.preventDefault();
    localStorage.setItem('user', 'Invitado');
    localStorage.setItem('isLoggedIn', 'true');
    location.href = "index.html";
});  */


window.addEventListener('load', () => {
  const savedUser = localStorage.getItem('savedUser');
  const savedPassword = localStorage.getItem('savedPassword');

  if (savedUser && savedPassword) {
    USERNAME.value = savedUser;
    PASSWORD.value = savedPassword;
  };
}); 
  

/* Código del botón mostrar contraseña */

SHOW_PASS_BTN.addEventListener("click", (e) => {
    const cambiarType = INPUT_PASS;
    var icon = ICON_PASS;
    var iconMsg = ICON_CONT;
    if(cambiarType.type == "password"){
        cambiarType.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        iconMsg.title = "Ocultar Contraseña";
    }else {
        cambiarType.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        iconMsg.title = "Mostrar Contraseña";
    }
});

/* Codigo de la pared deslizante */
 
BTN_REGISTER_HERE.addEventListener('click', (e) => {
    var newMensaje = MESSAGE;
    var textBtn = document.getElementById('register-login');
    SLIDEABLE_WALL.classList.toggle("slideLeft");
    if(newMensaje.textContent === "¿No tienes una cuenta?") {
        textBtn.textContent = "¡INGRESAR!";
        newMensaje.textContent = "¿Ya tienes una cuenta? ¡Entonces inicia sesion!"
    } else {
        newMensaje.textContent = "¿No tienes una cuenta?";
        textBtn.textContent = "¡REGÍSTRATE AQUÍ!";
    }
});







/* El display de la version movil(menos de 550pixeles) */

BTN_MOBILE_DEVICE.addEventListener("click", e => {

    REGISTER_CONTAINER.classList.toggle("slideUp");
})

REGISTER_LOGIN_BACK.addEventListener("click", e => {
    REGISTER_CONTAINER.classList.toggle("slideUp");
})