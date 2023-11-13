 //Codigo del modo oscuro
const DOC_BODY = document.querySelector("body");
const MODE_BTN = document.getElementById("modeBtn");
const JUMBOTRON = document.querySelector(".jumbotron");
const JUMBOTRON_DK_MODE = document.querySelector(".jumbotronDarkMode");
const ICON = document.querySelector(".modeBtnIcon");
const MAIN = document.querySelector("main");
const FOOTER = document.querySelector("footer");
const INPUT_ELEMENTS = document.getElementsByTagName('input');
const SELECT_ELEMENTS = document.getElementsByTagName('select');

// Aplicar el modo oscuro
MODE_BTN.addEventListener("click", ()=> {
  
  DOC_BODY.classList.toggle(".darkMode");
  if(JUMBOTRON !== null){
    JUMBOTRON.toggleAttribute("hidden");
    JUMBOTRON_DK_MODE.toggleAttribute("hidden");
  }
  storeDarkMode(DOC_BODY.classList.contains("darkMode"));
   if(DOC_BODY.classList.contains("darkMode")){
    ICON.classList.remove("fa-sun");
    ICON.classList.add("fa-moon");
  } else {
    ICON.classList.remove("fa-moon");
    ICON.classList.add("fa-sun");
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
    DOC_BODY.classList.add("darkMode");
    ICON.classList.add("fa-moon");
    if(JUMBOTRON !== null){
      JUMBOTRON.toggleAttribute("hidden");
      JUMBOTRON_DK_MODE.toggleAttribute("hidden");
    }
  }
}

window.addEventListener('load', loadDarkMode);

