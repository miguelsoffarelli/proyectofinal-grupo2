const img = document.getElementById("img");
const profilePicFile = document.getElementById("profilePicFile");
const profileUserNameCont = document.getElementById("profileUserName");



profilePicFile.addEventListener("change", e => {
    
    if(e.target.files[0]) {
        
        const reader = new FileReader();
        reader.onload = function(e){
            img.src = e.target.result;
            localStorage.setItem("userPic", img.getAttribute("src"))
        }
        reader.readAsDataURL(e.target.files[0])
    }else{
        img.src = img;
    }
    
});

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