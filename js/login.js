//Volver al "tercer commit" para volver a lo de antes

const username = document.getElementById('username')
const contrasena = document.getElementById('contrasena')
const boton_login = document.getElementById('boton_login')
const boton_registro = document.getElementById('boton_register')

//usuarios y contrasenas genericas, "como si estuvieran en la base de datos"
const usuarios = {
    usuario1 : "usuario1",
    usuario2 : "usuario2",
    usuario3 : "usuario3",
    usuario4 : "usuario4",
    usuario5 : "usuario5",
    usuario6 : "usuario6",
    usuario7 : "usuario7",
}

const contrasenas = {
    contrasena1 : "contrasena1",
    contrasena2 : "contrasena2",
    contrasena3 : "contrasena3",
    contrasena4 : "contrasena4",
    contrasena5 : "contrasena5",
    contrasena6 : "contrasena6",
    contrasena7 : "contrasena7",
}

//Codigo anterior para el log in, ahora para el registro. Anaden cualquier cosa y los deja entrar
boton_registro.addEventListener('click', (e)=> {
    e.preventDefault()
    if (username.value !== "" && contrasena.value !== ""){
        location.href = "index.html";
    } else {
        showAlertError()
        
    }
})

//Nuevo evento que utiliza los usuarios de la "base de datos" ficticia. Se loguean utilizando usuarios y contrasenas ya existentes
boton_login.addEventListener('click', (e)=> {
    e.preventDefault()
    if (username.value !== "" && contrasena.value !== ""){
    if (username.value in usuarios && contrasena.value in contrasenas){
        location.href = "index.html";
    } else {
        alert("Datos invalidos")
    }
        
    } else {
    showAlertError()
}
})

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(function() {
        document.getElementById("alert-danger").reset;
        location.reload();
    }, 2000);
}



