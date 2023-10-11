const regbtn = document.getElementById("boton_registrarse"); //llamamos al botón de registro
const usuario = document.getElementById("uName");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const email = document.getElementById("email");
let usersList = [];
if (!Array.isArray(usersList)) {
  usersList = [];
};

// Event Listener que valida los datos ingresados y, en caso positivo los guarda e inicia sesión, o de lo contrario muestra alerta de error
regbtn.addEventListener('click', (e)=> { 
    e.preventDefault()
    if (usuario.value !== "" && pass1.value !== "" && pass2.value && pass1.value.length >= 6 && email.value !== ""){ 
        saveUser();
        localStorage.setItem('user', usuario.value);                                                                             
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


// Clase para guardar los datos de usuario-----------------------------------------------------------------------------------------------------------
class User {
  constructor(uName, email, password) {
    this.uName = uName;
    this.email = email;
    this.password = password;
  }
  
  saveUserData() {
    usersList.push(this);
    localStorage.setItem("usersList", JSON.stringify(usersList));
  }
}

function saveUser(){
  const currentUser = new User(usuario.value, email.value, pass1.value);
  currentUser.saveUserData();
}

  