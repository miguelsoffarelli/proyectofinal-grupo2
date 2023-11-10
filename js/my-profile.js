const img = document.getElementById("img");
const profilePicFile = document.getElementById("profilePicFile");
const profileUserNameCont = document.getElementById("profileUserName");
const defaultUserPic = "img/img_perfil.png"
const userPicVerified = localStorage.getItem("userPicVerified");
const resetPicBtn = document.getElementById("resetProfilePic");
const logOut = document.getElementById("logOut");
const newNameInput = document.getElementById("changeName");
const nameChangeBtn = document.getElementById("changeNameBtn");
const inputBox = document.querySelector(".inputBox");
const saveNewName = document.getElementById("saveNewName");
const currentUser = localStorage.getItem('user');
const dataInputs = document.querySelectorAll('.userDataForm');
const saveDataBtn = document.getElementById('saveNewData');
let usersList = JSON.parse(localStorage.getItem('usersList'));
let validationList = [];
const ALERT = document.getElementById('alert-success');


profilePicFile.addEventListener("change", e => {

    if(e.target.files[0]) {
        
        const reader = new FileReader();
        reader.onload = function(e){
            img.src = e.target.result;
            localStorage.setItem("userPic", img.getAttribute("src"));
            location.reload();
        }
        reader.readAsDataURL(e.target.files[0])
    }else{
        img.src = img;
    }

});

resetProfilePic.addEventListener("click", e => {

    img.src = defaultUserPic;
    localStorage.setItem("userPic", img.getAttribute("src"));
})


function putUserName() {
    let h4 = document.createElement("h4");
    h4.innerHTML = `
    ${localStorage.getItem("user")}
    `;
    profileUserNameCont.append(h4);
}



logOut.addEventListener("click", cerrarSesion);

nameChangeBtn.addEventListener("click", () => {
    document.querySelector("h4").toggleAttribute("hidden");
    inputBox.toggleAttribute("hidden");
    newNameInput.value = currentUser;
});

saveNewName.addEventListener("click", e => {
    e.preventDefault();
    changeName();
    ALERT.classList.add("show");
    setTimeout(() => {
        ALERT.classList.remove("show");
        location.reload();
    }, 2000);
});

function changeName() {
    var newName = newNameInput.value
    usersList.forEach(user => {
        if (user.uName === currentUser) {
            user.uName = newName;
            localStorage.setItem('usersList', JSON.stringify(usersList));
        };
    });
    localStorage.setItem("user", newName);
    
};

function changeUserData() {
    usersList.forEach(user => {
        if (user.uName === currentUser){
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

saveDataBtn.addEventListener('click', e => {
    e.preventDefault();
    changeUserData();
    ALERT.classList.add("show");
    setTimeout(() => {
        ALERT.classList.remove("show");
    }, 2000);
});


document.addEventListener('DOMContentLoaded', () => {
    putUserName();
    img.setAttribute("src", localStorage.getItem("userPic"));
    usersList.forEach(user => {
        document.getElementById('changeEmail').value = user.email;
        document.getElementById('changeFname').value = user.fname;
        document.getElementById('changeSecondFname').value = user.secondName;
        document.getElementById('changeLname').value = user.lname;
        document.getElementById('changeSecondLname').value = user.secondLname;
        document.getElementById('changePhone').value = user.phone;
    });
    
    
    dataInputs.forEach(element => {
          
          let validInputs = document.getElementById('changeFname').checkValidity() && document.getElementById('changeLname').checkValidity() && document.getElementById('changeEmail').checkValidity() ?true :false;
          
          validInputs ?saveDataBtn.removeAttribute('disabled') :saveDataBtn.setAttribute('disabled', "");

        element.addEventListener('input', () => {
            if (!element.checkValidity()) {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
              } else {
                element.classList.add('is-valid');
                element.classList.remove('is-invalid');
              };
              validInputs = document.getElementById('changeFname').checkValidity() && document.getElementById('changeLname').checkValidity() && document.getElementById('changeEmail').checkValidity() && document.getElementById('changePhone').checkValidity() ?true :false;
              validInputs ?saveDataBtn.removeAttribute('disabled') :saveDataBtn.setAttribute('disabled', "");
        });
        
        
    });

});
