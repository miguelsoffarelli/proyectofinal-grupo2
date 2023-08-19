const regbtn = document.getElementById("boton_registrarse"); //llamamos al botón de registro
const usuario = document.getElementById("uName");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const email = document.getElementById("email");


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