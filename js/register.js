const REGISTER = document.getElementById("boton_registrarse"); //llamamos al botón de registro
const USER = document.getElementById("uName");
const PASS1 = document.getElementById("pass1");
const PASS2 = document.getElementById("pass2");
const EMAIL = document.getElementById("email");
let usersList = JSON.parse(localStorage.getItem('usersList')) || [];
const POST_URL = "http://localhost:3000/register";
const USERS_URL = "http://localhost:3000/login";



// Event Listener que valida los datos ingresados y, en caso positivo los guarda e inicia sesión, o de lo contrario muestra alerta de error
REGISTER.addEventListener('click', async (e)=> { 
    e.preventDefault();
    const USERS = await fetch(USERS_URL);
    const USERS_DATA = await USERS.json();
    console.log(USERS_DATA);
    const username = USER.value;
    const password = PASS1.value;
    if (!(USERS_DATA.some(user => user.username === USER.value)) && USER.value !== "" && PASS1.value !== "" && PASS2.value && PASS1.value.length >= 6 && EMAIL.value !== ""){
      const postOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      };
      try {
        const response = await fetch(POST_URL, postOptions);
        const data = await response.json();
        console.log(data);
      } catch {
        console.error(error);
      }; 
      saveUser();
      localStorage.setItem('user', USER.value);                                                                             
      localStorage.setItem('isLoggedIn', 'true');   
      localStorage.setItem("userPic", "img/img_perfil.png");                                                                     
      showAlertSuccess();                                                                                                
      setTimeout(function() {
          location.href = "my-profile.html"                                                                                   
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
  constructor(uName, email, password, fname, secondName, lname, secondLname, phone) {
    this.uName = uName;
    this.email = email;
    this.password = password;
    this.fname = fname;
    this.secondName = secondName;
    this.lname = lname;
    this.secondLname = secondLname;
    this.phone = phone;
  }
  
  saveUserData() {
    usersList.push(this);
    localStorage.setItem("usersList", JSON.stringify(usersList));
  }
}

function saveUser(){
  let currentUser = new User(USER.value, EMAIL.value, PASS1.value, "", "", "", "", "");
  currentUser.saveUserData();
}



