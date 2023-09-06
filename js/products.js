const categoria = localStorage.getItem('catID'); // Ya que los archivos index.js y categories.js ya incluyen la función de guardar la id de la categoría en localStorage, accedemos a ella
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoria + ".json"; // y reemplazamos en la url por la id de la api correspondiente
const container = document.getElementById("product-list");
const ordenar_desc = document.getElementById('priceDesc');
const ordenar_asc = document.getElementById('priceAsc');
const ordenar_rel = document.getElementById('rel');
const minimo = document.getElementById('rangeFilterCountMin');
const maximo = document.getElementById('rangeFilterCountMax');
const limpiar = document.getElementById('clearRangeFilter');
const titulo = document.getElementById('categoryName');
const searchBar = document.getElementById('buscador');
let products = "";

function fetchData(funcion) {
  try {
    return fetch(DATA_URL)
    .then(response => response.json())
    .then(data => {
      funcion(data);
      titulo.innerText = data.catName;
    })
  } catch {
    alert("ERROR!" + response.status);
  };
};

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
};

function showProducts(data) {
  let htmlContentToAppend = "";
  let products = data.products; 
    for (let product of products) {     
        htmlContentToAppend += `
        <div onclick="setProdID(${product.id})" class="container list-group m-4 producto cursor-active" id="${product.id}" data-name="${product.name}" data-description="${product.description}" data-cost="${product.cost}"}>
        <div class="product row list-group-item d-flex justify-content-between">
        <div class="col-3">
          <img src="${product.image}" alt="${product.name}" class="product-image img-thumbnail">
        </div>
        <div class="col-7">
          <h2 class="product-name">${product.name}</h2>
          <p class="product-description">${product.description}</p>
          <p class="product-cost">${product.currency} ${product.cost}</p>
        </div>
        <div class="col-2 text-muted">
          <p class="product-sold">${product.soldCount} vendidos</p>
        </div>
        </div>
        </div>
      `;
    };
    container.innerHTML = htmlContentToAppend;
};


function sort(data, criteria, by){
  let order = "";
  if (criteria === "asc"){
    order = 1;
  } else if (criteria === "desc"){
    order = -1;
  }
  limpiar.removeAttribute("disabled");
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

 function buscador (data, e){
  if (e.target.matches("#buscador")){ 
    document.querySelectorAll(".producto").forEach(product =>{
      if (product.dataset.name.toLowerCase().includes(e.target.value.toLowerCase()) || product.dataset.description.toLowerCase().includes(e.target.value.toLowerCase()) ){                                   
        product.classList.remove('filtro');
      } else{
      product.classList.add("filtro"); 
      };
    });
  };
};
//En products.html agregue el buscador con el id="buscador". 
// En la funcion showProducts modifique la primer linea de lo que se apendea esto:
// <div class="container list-group m-4 producto" id="${product.name}">
// le agregue como id el nombre del producto para compararlo con la busqueda.
// en styles.css agregue la clase filtro para que cuando se le agrega al div no se vea.

function elMinimo (data, e){
  limpiar.removeAttribute("disabled");
  showProducts(data);
  if (maximo.value) {    
    if (e.target.matches('#rangeFilterCountMin')){ 
    document.querySelectorAll(".producto").forEach(product =>{ 
      parseInt(product.dataset.cost) >= parseInt(minimo.value) && parseInt(product.dataset.cost) <= parseInt(maximo.value)
        ?product.classList.remove('filtro') 
        :product.classList.add("filtro") 
      })
    }
  } else {
     if (e.target.matches('#rangeFilterCountMin')){ 
      document.querySelectorAll(".producto").forEach(product =>{ 
        parseInt(product.dataset.cost) >= parseInt(minimo.value)
          ?product.classList.remove('filtro') 
          :product.classList.add("filtro") 
        });
      };
    };  
  e.stopPropagation();
};

function elMaximo (data, e){
  limpiar.removeAttribute("disabled");
  showProducts(data);
  if (minimo.value) {
    if (e.target.matches('#rangeFilterCountMax')){ 
      document.querySelectorAll(".producto").forEach(product =>{ 
        parseInt(product.dataset.cost) <= parseInt(maximo.value) && parseInt(product.dataset.cost) >= parseInt(minimo.value) 
          ?product.classList.remove('filtro') 
          :product.classList.add("filtro") 
        })
      }
  } else {
    if (e.target.matches('#rangeFilterCountMax')){ 
      document.querySelectorAll(".producto").forEach(product =>{ 
        parseInt(product.dataset.cost) <= parseInt(maximo.value)
          ?product.classList.remove('filtro')  
          :product.classList.add("filtro") 
        });
      };
    };
  e.stopPropagation();
};

function minOfMax(){
  if (minimo.value > maximo.value) {
    maximo.value = minimo.value;
    maximo.setAttribute("min", minimo.value);
    };
    maximo.focus();
    maximo.select();
};

function clean(){
  minimo.value = "";
  maximo.value = "";
  searchBar.value = "";
  fetchData(showProducts);
  limpiar.setAttribute("disabled", "");
};


window.addEventListener('load', () => {
  fetchData(showProducts);  
});

ordenar_asc.addEventListener('click', () => {
  fetchData(data => sort(data, "asc", "cost"));  
});

ordenar_desc.addEventListener('click', () => {
  fetchData(data => sort(data, "desc", "cost"));  
});

ordenar_rel.addEventListener('click', () => {
  fetchData(data => sort(data, "desc", "soldCount"));  
});

maximo.addEventListener('focus', () => {
  minOfMax();
});

document.addEventListener('keyup', e =>{
  fetchData(data => buscador(data, e))
});

minimo.addEventListener('keyup', e =>{
  fetchData(data => elMinimo(data, e));
});

maximo.addEventListener('keyup', e =>{
  fetchData(data => elMaximo(data, e))
});

limpiar.addEventListener('click', () => {
  clean()
});