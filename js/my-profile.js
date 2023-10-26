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

profilePicFile.addEventListener("change", e => {
    
    if(e.target.files[0]) {
        
        const reader = new FileReader();
        reader.onload = function(e){
            img.src = e.target.result;
            localStorage.setItem("userPic", img.getAttribute("src"));
            localStorage.setItem("userPicVerified", true);
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
putUserName();

window.addEventListener("load", () => {
    img.setAttribute("src", localStorage.getItem("userPic"));

})
logOut.addEventListener("click", cerrarSesion);

nameChangeBtn.addEventListener("click", () => {

    document.querySelector("h4").toggleAttribute("hidden");
    inputBox.toggleAttribute("hidden");
});

