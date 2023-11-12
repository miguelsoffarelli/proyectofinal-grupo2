const IMG = document.getElementById("img");
const PROFILE_PIC_FILE = document.getElementById("profilePicFile");
const PROFILE_USERNAME_CONT = document.getElementById("profileUserName");
const DEFAULT_USER_PIC = "img/img_perfil.png"
const USER_PIC_VERIFIED = localStorage.getItem("userPicVerified");
const RESET_PIC_BTN = document.getElementById("resetProfilePic");
const LOG_OUT = document.getElementById("logOut");
const NEW_NAME_INPUT = document.getElementById("changeName");
const NAME_CHANGE_BTN = document.getElementById("changeNameBtn");
const INPUT_BOX = document.querySelector(".inputBox");
const SAVE_NEW_NAME = document.getElementById("saveNewName");
const CURRENT_USER = localStorage.getItem('user');
const DATA_INPUTS = document.querySelectorAll('.userDataForm');
const SAVE_DATA_BTN = document.getElementById('saveNewData');
const ALERT = document.getElementById('alert-success');
let usersList = JSON.parse(localStorage.getItem('usersList'));
let validationList = [];

// Cambiar foto de perfil
PROFILE_PIC_FILE.addEventListener("change", e => {

    if(e.target.files[0]) {
        
        const reader = new FileReader();
        reader.onload = function(e){
            IMG.src = e.target.result;
            localStorage.setItem("userPic", IMG.getAttribute("src"));
            location.reload();
        }
        reader.readAsDataURL(e.target.files[0])
    }else{
        IMG.src = IMG;
    }

});


// Reestablecer (eliminar) foto de perfil
resetProfilePic.addEventListener("click", e => {

    IMG.src = DEFAULT_USER_PIC;
    localStorage.setItem("userPic", IMG.getAttribute("src"));
})

// Mostrar input para cambiar nombre de usuario
function putUserName() {
    let h4 = document.createElement("h4");
    h4.innerHTML = `
    ${localStorage.getItem("user")}
    `;
    PROFILE_USERNAME_CONT.append(h4);
}


// Cerrar sesión
LOG_OUT.addEventListener("click", cerrarSesion);


// Guardar nuevo nombre de usuario
NAME_CHANGE_BTN.addEventListener("click", () => {
    document.querySelector("h4").toggleAttribute("hidden");
    INPUT_BOX.toggleAttribute("hidden");
    NEW_NAME_INPUT.value = CURRENT_USER;
});

SAVE_NEW_NAME.addEventListener("click", e => {
    e.preventDefault();
    changeName();
    ALERT.classList.add("show");
    setTimeout(() => {
        ALERT.classList.remove("show");
        location.reload();
    }, 2000);
});

function changeName() {
    var newName = NEW_NAME_INPUT.value
    usersList.forEach(user => {
        if (user.uName === CURRENT_USER) {
            user.uName = newName;
            localStorage.setItem('usersList', JSON.stringify(usersList));
        };
    });
    localStorage.setItem("user", newName);
    
};

// Formulario de datos de usuario
function changeUserData() {
    usersList.forEach(user => {
        if (user.uName === CURRENT_USER){
            user.fname = document.getElementById('changeFname').value;
            user.secondName = document.getElementById('changeSecondFname').value ?document.getElementById('changeSecondFname').value :"";
            user.lname = document.getElementById('changeLname').value;
            user.secondLname = document.getElementById('changeSecondLname').value;
            user.email = document.getElementById('changeEmail').value;
            user.phone = document.getElementById('changePhone').value;
            localStorage.setItem('usersList', JSON.stringify(usersList));
            
        };
    });
};

SAVE_DATA_BTN.addEventListener('click', e => {
    e.preventDefault();
    changeUserData();
    ALERT.classList.add("show");
    setTimeout(() => {
        ALERT.classList.remove("show");
    }, 2000);
});

// Cargar datos del usuario en los inputs
document.addEventListener('DOMContentLoaded', () => {
    putUserName();
    IMG.setAttribute("src", localStorage.getItem("userPic"));
    usersList.forEach(user => {
        document.getElementById('changeEmail').value = user.email;
        document.getElementById('changeFname').value = user.fname;
        document.getElementById('changeSecondFname').value = user.secondName;
        document.getElementById('changeLname').value = user.lname;
        document.getElementById('changeSecondLname').value = user.secondLname;
        document.getElementById('changePhone').value = user.phone;
    });
    
    
    // Validaciones
    DATA_INPUTS.forEach(element => {
          
          let validInputs = document.getElementById('changeFname').checkValidity() && document.getElementById('changeLname').checkValidity() && document.getElementById('changeEmail').checkValidity() ?true :false;
          
          validInputs ?SAVE_DATA_BTN.removeAttribute('disabled') :SAVE_DATA_BTN.setAttribute('disabled', "");
        
            console.log(element.value)
          
            let label = document.querySelector(`label[for="${element.id}"]`);

            if (element.value !== "") {
                
                label.classList.remove("vacio");
                label.classList.add("lleno");
            } else {
                
                label.classList.add("vacio");
                label.classList.remove("lleno");
            }

        element.addEventListener('input', () => {
            if (!element.checkValidity()) {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
              } else {
                element.classList.add('is-valid');
                element.classList.remove('is-invalid');
                label.classList.remove("vacio");
                label.classList.add("lleno");
              };
              validInputs = document.getElementById('changeFname').checkValidity() && document.getElementById('changeLname').checkValidity() && document.getElementById('changeEmail').checkValidity() && document.getElementById('changePhone').checkValidity() ?true :false;
              validInputs ?SAVE_DATA_BTN.removeAttribute('disabled') :SAVE_DATA_BTN.setAttribute('disabled', "");
        });
    });
});
