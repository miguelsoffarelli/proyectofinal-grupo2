const username = document.getElementById('username');
const contrasena = document.getElementById('contrasena');
const boton_login = document.getElementById('boton_login');
const boton_registro = document.getElementById('boton_register');
const saltarLogin = document.getElementById('skip');
const rememberMeCheckbox = document.getElementById('rememberMe');
const savedUsers = JSON.parse(localStorage.getItem("usersList"));

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
  
  boton_registro.addEventListener('click', (e)=> {
    e.preventDefault();
    location.href = "register.html";
});