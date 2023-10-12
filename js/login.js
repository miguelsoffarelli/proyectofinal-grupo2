const username = document.getElementById('username');
const contrasena = document.getElementById('contrasena');
const boton_login = document.getElementById('boton_login');
const boton_registro = document.getElementById('boton_registro');
const saltarLogin = document.getElementById('skip');
const rememberMeCheckbox = document.getElementById('rememberMe');
const savedUsers = JSON.parse(localStorage.getItem("usersList"));
const inputPass = document.querySelector(".inputPass"); // Esto trae al input de contraseña
const showPassBtn = document.getElementById("showPassBtn"); // el boton de mostrar contraseña
const iconCont = document.querySelector(".inputIconPassCon"); //Esto trae al div contenedor del icono.
const iconPass = document.querySelector(".iconPass"); // Esto trae el icono
const slideableWall = document.querySelector(".slideableWall"); // La pared deslizante.
const btnRegisterHere = document.getElementById('btnRegisterHere'); //La constante que trae al botón "¡Registrate aqui!"
const mensaje = document.getElementById("mensaje"); //Trae el mensaje de la slideable wall
const btnMobileDevice = document.getElementById("btnMobileFoot"); //trae el boton de subida en la version movil.
const registerContainer = document.querySelector(".registerContainer"); //trae al registerContainer
const registerLoginBack = document.getElementById("registerLoginBack"); //trae al otro boton de subida en el register movil
// Función que muestra error si las credenciales son incorrectas
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-danger").classList.remove("show");
        location.reload();
    }, 2000);
};

// Event Listener que valida si las credenciales son correctas, las guarda en localStorage y valida el checkbox "recordarme" 
boton_login.addEventListener('click', (e)=> {
    e.preventDefault();
    if(username.value, contrasena.value){
        if (savedUsers.some(user => user.uName === username.value) && savedUsers.some(user => user.password === contrasena.value)){ // Si bien solicitamos una contraseña de 6 caracteres o más al registrarse, al loguearse permitía hacerlo con cualquier contraseña, por lo que agregamos la condición.
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('savedUser', username.value);
                localStorage.setItem('savedPassword', contrasena.value);
            } else {
                localStorage.removeItem('savedUser');
                localStorage.removeItem('savedPassword');
            }
            localStorage.setItem('user', username.value);
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
    username.value = savedUser;
    contrasena.value = savedPassword;
  };
}); 
  

/* Código del botón mostrar contraseña */

showPassBtn.addEventListener("click", (e) => {
    const cambiarType = inputPass;
    var icon = iconPass;
    var iconMsg = iconCont;
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
 
btnRegisterHere.addEventListener('click', (e) => {
    var newMensaje = mensaje;
    var textBtn = document.getElementById('register-login');
    slideableWall.classList.toggle("slideLeft");
    if(newMensaje.textContent === "¿No tienes una cuenta?") {
        textBtn.textContent = "¡INGRESAR!";
        newMensaje.textContent = "¿Ya tienes una cuenta? ¡Entonces inicia sesion!"
    } else {
        newMensaje.textContent = "¿No tienes una cuenta?";
        textBtn.textContent = "¡REGÍSTRATE AQUÍ!";
    }
});

/* FALTA QUE CAMBIE EL MENSAJE DEL BOTON DE REGISTRO */





/* El display de la version movil(menos de 550pixeles) */

btnMobileDevice.addEventListener("click", e => {

    registerContainer.classList.toggle("slideUp");
})

registerLoginBack.addEventListener("click", e => {
    registerContainer.classList.toggle("slideUp");
})