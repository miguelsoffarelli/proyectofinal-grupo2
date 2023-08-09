const username = document.getElementById('username')
const contrasena = document.getElementById('contrasena')
const boton = document.getElementById('boton_login')



boton.addEventListener('click', (e)=> {
    e.preventDefault()
    const data = {
        usuario: username.value,
        contrasena: contrasena.value
    }

    if (username.value !== "" && contrasena.value !== ""){
        location.href = "index.html";
    } else {
        showAlertError()
        
    }
    console.log(data)
    
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



