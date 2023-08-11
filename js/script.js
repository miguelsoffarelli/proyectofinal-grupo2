document.addEventListener("DOMContentLoaded", validar() );
// Verificar si el usuario está logueado
function validar(){
    if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    } else {

    }  
}
const Profile = document.getElementById('profile');

function myProfile() {
    if (localStorage.getItem('isLoggedIn')){
        Profile.style.visibility = visible 
    }
}
