const username = document.getElementById('username')
const contrasena = document.getElementById('contrasena')
const boton = document.getElementById('boton_login')



boton.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        usuario: username.value,
        contrasena: contrasena.value
    }

    console.log(data)
})


