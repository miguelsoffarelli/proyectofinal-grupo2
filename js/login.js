//Volver al "tercer commit" para volver a lo de antes

const username = document.getElementById('username');
const contrasena = document.getElementById('contrasena');
const boton_login = document.getElementById('boton_login');
const boton_registro = document.getElementById('boton_register');
const saltarLogin = document.getElementById('skip');
const rememberMeCheckbox = document.getElementById('rememberMe');


//Codigo anterior para el log in, ahora para el registro. Anaden cualquier cosa y los deja entrar
boton_registro.addEventListener('click', (e)=> {
    e.preventDefault();
    location.href = "register.html";
});


boton_login.addEventListener('click', (e)=> {
    e.preventDefault();
    if (username.value !== "" && contrasena.value !== ""){
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
        showAlertError();
        
    };
});


function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-danger").reset;
        location.reload();
    }, 2000);
};


saltarLogin.addEventListener('click', (e)=> {
    e.preventDefault();
    localStorage.setItem('user', 'Invitado');
    localStorage.setItem('isLoggedIn', 'true');
    location.href = "index.html";
});

window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('savedUser');
    const savedPassword = localStorage.getItem('savedPassword');
  
    if (savedUser && savedPassword) {
      username.value = savedUser;
      contrasena.value = savedPassword;
    };
  });