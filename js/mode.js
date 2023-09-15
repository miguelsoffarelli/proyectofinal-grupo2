 //Codigo del modo oscuro
const body = document.querySelector("body");
const btnMode = document.getElementById("modeBtn");
const jumbotron = document.querySelector(".jumbotron");
const jumbotronDKMode = document.querySelector(".jumbotronDarkMode");
const icon = document.querySelector(".modeBtnIcon");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const INPUT_ELEMENTS = document.getElementsByTagName('input');
const SELECT_ELEMENTS = document.getElementsByTagName('select');



btnMode.addEventListener("click", ()=> {
  
  body.classList.toggle(".darkMode");
  if(jumbotron !== null){
    jumbotron.toggleAttribute("hidden");
    jumbotronDKMode.toggleAttribute("hidden");
  }
  storeDarkMode(body.classList.contains("darkMode"));
   if(body.classList.contains("darkMode")){
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
});

//Para salvar el modo oscuro en el localstorage.

function storeDarkMode(value) {
  localStorage.setItem("darkMode", value)
};

function loadDarkMode(){
  const darkMode = localStorage.getItem("darkMode");

  if(!darkMode){
    storeDarkMode(false);
  } else if(darkMode == "true"){
    body.classList.add("darkMode");
    icon.classList.add("fa-moon");
    if(jumbotron !== null){
      jumbotron.toggleAttribute("hidden");
      jumbotronDKMode.toggleAttribute("hidden");
    }
  }
}

window.addEventListener('load', loadDarkMode);

