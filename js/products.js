const CATEGORY = localStorage.getItem('catID'); // Ya que los archivos index.js y categories.js ya incluyen la función de guardar la id de la categoría en localStorage, accedemos a ella
const DATA_URL = "http://localhost:3000/api/" + CATEGORY; // y reemplazamos en la url por la id de la api correspondiente //* Actualizado para hacer uso de las variables declaradas en init.js
const CONTAINER = document.getElementById("product-list");
const ORDER_DESC = document.getElementById('priceDesc');
const ORDER_ASC = document.getElementById('priceAsc');
const ORDER_REL = document.getElementById('rel');
const MINIMUM = document.getElementById('rangeFilterCountMin');
const MAXIMUM = document.getElementById('rangeFilterCountMax');
const CLEAN = document.getElementById('clearRangeFilter');
const TITLE = document.getElementById('categoryName');
const SEARCH_BAR = document.getElementById('buscador');
let products = "";
let coincidencias = false;



//* La función fetch que estaba acá se trasladó al init.js para poder re-utilizarla en product-info.js



// Función para mostrar los productos------------------------------------------------------------------------------------------------------------------------------------------------
async function showProducts(data) {  
  let htmlContentToAppend = "";
  let products = data.products;
  const exchangeRateUsd = await getExchangeRate('usd');
  const exchangeRateUyu = await getExchangeRate('uyu');
  for (let product of products) {
    const prodCurrency = product.currency; 
    if(prodCurrency === 'USD'){
      htmlContentToAppend += `
      <div onclick="setProdID(${product.id})" class="container list-group m-4 producto cursor-active" id="${product.id}" data-name="${product.name}" data-description="${product.description}" data-cost="${product.cost}"}>
        <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
          <div class="col-3">
            <img src="${product.image}" alt="${product.name}" class="product-image img-thumbnail">
          </div>
          <div class="col-7">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <p class="product-cost">${selectedCur} ${hasDiscount(product.id, (product.cost / exchangeRateUsd).toFixed(0))}</p>
          </div>
          <div class="col-2 text-muted">
            <p class="product-sold">${product.soldCount} vendidos</p>
          </div>
        </div>
      </div>
    `;
    } else if (prodCurrency === 'UYU'){
      htmlContentToAppend += `
      <div onclick="setProdID(${product.id})" class="container list-group m-4 producto cursor-active" id="${product.id}" data-name="${product.name}" data-description="${product.description}" data-cost="${product.cost}"}>
        <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
          <div class="col-3">
            <img src="${product.image}" alt="${product.name}" class="product-image img-thumbnail">
          </div>
          <div class="col-7">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <p class="product-cost">${selectedCur} ${hasDiscount(product.id, (product.cost / exchangeRateUyu).toFixed(0))}</p>
          </div>
          <div class="col-2 text-muted">
            <p class="product-sold">${product.soldCount} vendidos</p>
          </div>
        </div>
      </div>
    `;
    };  
       
  };
  TITLE.innerText = data.catName;
  let mensaje = `<h3 class="filtro" id="mensaje">No hay elementos que coincidan con su búsqueda.</h3>`
  htmlContentToAppend += mensaje;
  CONTAINER.innerHTML = htmlContentToAppend;    
};

// Funciones para mostrar u ocultar productos mediante el uso de la clase filtro----------------------------------------------------------------------
function filterOn(element) {
  element.classList.add("filtro");
};

function filterOff(element){
  element.classList.remove("filtro");
};


// Función para ordenar los productos-------------------------------------------------------------------
function sort(data, criteria, by){
  let order = "";
  if (criteria === "asc"){
    order = 1;
  } else if (criteria === "desc"){
    order = -1;
  }
  CLEAN.removeAttribute("disabled");
  let sortedList = [];
  let numbers = [];
  for (product of data.products){
      numbers.push(product[by]);
  }
  numbers.sort((a, b) => (a - b) * order);
  for (precio of numbers){
    for (product of data.products){
      if (precio == product[by]  && !(sortedList.includes(product))){
        sortedList.push(product);
      };
    };
  };
  showProducts({products: sortedList});
};


// Función del buscador----------------------------------------------------------------------------------------------------------------------------------------------------
 function buscador (e){ // *el parámetro data no se utilizaba, probé a borrarlo aquí y en la escucha y no se rompió nada, por lo que podemos concluir que no era necesario.
  if (e.target.matches("#buscador")){ 
    const productos = document.querySelectorAll(".producto");
    coincidencias = false
    productos.forEach(product =>{
      if (product.dataset.name.toLowerCase().includes(e.target.value.toLowerCase()) || product.dataset.description.toLowerCase().includes(e.target.value.toLowerCase()) ){                                   
        filterOff(product);
        coincidencias = true
      } else{
        filterOn(product);
      };
    });    
  };
  noResults();
};
// En products.html agregue el buscador con el id="buscador". 
// En la funcion showProducts modifique la primer linea de lo que se apendea esto:
// <div class="container list-group m-4 producto" id="${product.name}">
// le agregue como id el nombre del producto para compararlo con la busqueda.
// en styles.css agregue la clase filtro para que cuando se le agrega al div no se vea.

// Función para búsquedas sin resultados-----------------------------------------------------
function noResults(){
  const noCoincidence = document.getElementById('mensaje');

  if (coincidencias) {
    filterOn(noCoincidence);
  } else{
    filterOff(noCoincidence);
  };
};


// Filtro por rango de precios---------------------------------------------------------------
function costRange(data, e) {
  showProducts(data);
  const productos = document.querySelectorAll(".producto");

  if (e.target.matches('#rangeFilterCountMin')) {
    if (MINIMUM.value && MAXIMUM.value) {
      bothInputs(productos);
    } else if (MINIMUM.value){
      oneInput("minimo", productos);
    };
  } ;
  if (e.target.matches('#rangeFilterCountMax')) {
    if (MAXIMUM.value && MINIMUM.value) {
      bothInputs(productos);
    } else if (MAXIMUM.value) {
      oneInput("maximo", productos);
    };
  };
  e.stopPropagation();
};

// Funciones auxiliares para filtro por rango de precios-------------------------------------
function bothInputs(productos){
  productos.forEach(product =>{ 
    const price = product.dataset.cost;
    parseInt(price) >= parseInt(MINIMUM.value) && parseInt(price) <= parseInt(MAXIMUM.value)
      ? (filterOff(product), coincidencias = true) 
      : filterOn(product); 
    });
};

function oneInput(input, productos){
  productos.forEach(product =>{
    const price = product.dataset.cost;
    if (input === "maximo"){
      parseInt(price) <= parseInt(MAXIMUM.value)
      ? (filterOff(product), coincidencias = true) 
      : filterOn(product); 
    } else if (input === "minimo"){
      parseInt(price) >= parseInt(MINIMUM.value)
      ? (filterOff(product), coincidencias = true)
      : filterOn(product); 
    };    
  });
};


function minOfMax(){
  if (MINIMUM.value > MAXIMUM.value) {
    MAXIMUM.value = MINIMUM.value;
    MAXIMUM.setAttribute("min", MINIMUM.value);
    };
    MAXIMUM.focus();
    MAXIMUM.select();
};


// Función del botón limpiar--------------------------------------------------------------------
function clean(){
  MINIMUM.value = "";
  MAXIMUM.value = "";
  SEARCH_BAR.value = "";
  fetchData(showProducts, DATA_URL);
  CLEAN.setAttribute("disabled", "");
};


// Event listeners------------------------------------------------------------------------------
window.addEventListener('load', () => {
    fetchData(showProducts, DATA_URL); 
});

ORDER_ASC.addEventListener('click', () => {
  fetchData(data => sort(data, "asc", "cost"), DATA_URL);  
});

ORDER_DESC.addEventListener('click', () => {
  fetchData(data => sort(data, "desc", "cost"), DATA_URL);  
});

ORDER_REL.addEventListener('click', () => {
  fetchData(data => sort(data, "desc", "soldCount"), DATA_URL);  
});

MAXIMUM.addEventListener('focus', () => {
  minOfMax();
});

SEARCH_BAR.addEventListener('keyup', e =>{ // * Cambié window por searchBar para que sólo escuche los keyups en caso de que el foco esté en la barra de búsqueda.
  fetchData(buscador(e), DATA_URL)
});

SEARCH_BAR.addEventListener('input', () => { //*Esta escucha la agregué porque al borrar un input manualmente (es decir sin usar el botón limpiar), el botón limpiar no se
  if (SEARCH_BAR.value.trim() === '') {      //* deshabilitaba, dejándolo utilizable en situaciones innecesarias. 
    clean();                                
  } else{                                   
    CLEAN.removeAttribute("disabled");
  }
});

MINIMUM.addEventListener('keyup', e =>{
  fetchData(data => costRange(data, e), DATA_URL);
});

MAXIMUM.addEventListener('keyup', e =>{
  fetchData(data => costRange(data, e), DATA_URL);
});

MINIMUM.addEventListener('input', () => { //*Esta escucha la agregué porque al borrar un input manualmente (es decir sin usar el botón limpiar), el botón limpiar no se
  if (MINIMUM.value.trim() === '' && MAXIMUM.value.trim() === '') {      //* deshabilitaba, dejándolo utilizable en situaciones innecesarias. 
    clean();                             
  } else{                                   
    CLEAN.removeAttribute("disabled");
  };
});

MAXIMUM.addEventListener('input', () => { //*Esta escucha la agregué porque al borrar un input manualmente (es decir sin usar el botón limpiar), el botón limpiar no se
  if (MAXIMUM.value.trim() === '' && MINIMUM.value.trim() === '') {      //* deshabilitaba, dejándolo utilizable en situaciones innecesarias. 
    clean();                               
  } else{                                   
    CLEAN.removeAttribute("disabled");
  };
});

CLEAN.addEventListener('click', () => {
  clean()
});

document.addEventListener('DOMContentLoaded', () => {
  CONTAINER.classList.add('animate__animated', 'animate__fadeInLeft');
})