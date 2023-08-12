const regbtn = document.getElementById("boton_registrarse"); //llamamos al botón de registro

regbtn.addEventListener('click', (e)=> { //añadimos un manejador de eventos para click
    e.preventDefault()
    if (fname.value !== "" && lname.value !=="" && uName.value !== "" && pass1.value !== "" && pass2.value && email.value !== ""){ //si se cumplen estas condiciones 
        localStorage.setItem(pass1.value, uName.value)                                                                             //se guardan los datos en localStorage
        localStorage.setItem('isLoggedIn', 'true')                                                                                 //se guarda la sesión
        location.href = "index.html";                                                                                              //y se redirecciona a la página principal
    } else {                                                                                                                       //de lo contrario
        showAlertError()                                                                                                           //se muestra la alerta
        
    }
})

function showAlertError() { //función que muestra la alerta
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-danger").reset;
        location.reload();
    }, 2000);
}