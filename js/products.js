const categoria = localStorage.getItem('catID'); // Ya que los archivos index.js y categories.js ya incluyen la función de guardar la id de la
                                                 // categoría en localStorage, accedemos a ella
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoria + ".json"; // y reemplazamos en la url por la id de la api correspondiente
const container = document.getElementById("product-list");
const ordenar_desc = document.getElementById('priceDesc');
const ordenar_asc = document.getElementById('priceAsc');
const ordenar_rel = document.getElementById('rel');
const minimo = document.getElementById('rangeFilterCountMin');
const maximo = document.getElementById('rangeFilterCountMax');
const limpiar = document.getElementById('clearRangeFilter');
let products = "";

function fetchData(funcion) {
  try {
    return fetch(DATA_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      funcion(data);
    })
  } catch {
    alert("ERROR!" + response.status);
  };
};

function showProducts(data) {
  let htmlContentToAppend = "";
  let products = data.products;
  console.log(products);  
    for (let product of products) {     
        htmlContentToAppend += `
        <div class="container list-group m-4 producto" id="${product.name}">
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

function ordenar_menor_precio(data){   
  let lista_ordenada_menor = [];
  let numeros = [];
  for (product of data.products){
      numeros.push(product.cost);
  }
  numeros.sort((a, b) => a - b);
  for (precio of numeros){
    for (product of data.products){
      if (precio == product.cost  && !(lista_ordenada_menor.includes(product))){
        lista_ordenada_menor.push(product);
      };
    };
  };
  showProducts({products: lista_ordenada_menor});
};

function ordenar_mayor_precio(data){
  let lista_ordenada_mayor = [];
  let numeros = [];
  for (product of data.products){
      numeros.push(product.cost);
  }
  numeros.sort((a, b) => b - a);
  for (precio of numeros){
    for (product of data.products){
      if (precio == product.cost  && !(lista_ordenada_mayor.includes(product))){
        lista_ordenada_mayor.push(product);
      };
    };
  };
  showProducts({products: lista_ordenada_mayor});
};

function ordenar_relevancia(data){
  let numeros = [];
  let lista_ordenada_relevancia = []
  for (product of data.products){
      numeros.push(product.soldCount);
  }
  numeros.sort((a, b) => b - a);
  for (vendidos of numeros){
    for (product of data.products){
      if (vendidos == product.soldCount  && !(lista_ordenada_relevancia.includes(product))){
        lista_ordenada_relevancia.push(product);
      };
    };
  };
  showProducts({products: lista_ordenada_relevancia});
};

function buscador (data, e){
  if (e.target.matches("#buscador")){ //si el parametro hace "match" con el buscador
    document.querySelectorAll(".producto").forEach(product =>{ //selecciona a todos los divs con clase producto y realiza la funcion para cada uno
      product.id.toLowerCase().includes(e.target.value.toLowerCase()) //toma el id del producto y se fija si lo que escribimos en el buscador coincide
        ?product.classList.remove('filtro') // esto es una funcion pregunta, por lo que entendi. Si lo que escribimos en el buscador incluye el id del producto se le remueve la clase filtro
        :product.classList.add("filtro") // si no, se le agrega la clase filtro
    });
  };
};



//En products.html agregue el buscador con el id="buscador". 
// En la funcion showProducts modifique la primer linea de lo que se apendea esto:
// <div class="container list-group m-4 producto" id="${product.name}">
// le agregue como id el nombre del producto para compararlo con la busqueda.
// en styles.css agregue la clase filtro para que cuando se le agrega al div no se vea.


function elMinimo (data, e){
  showProductsMinMax(data);
  if (maximo.value) {    
    if (e.target.matches('#rangeFilterCountMin')){ //si el parametro hace "match" con el buscador
    document.querySelectorAll(".producto").forEach(product =>{ //selecciona a todos los divs con clase producto y realiza la funcion para cada uno
      parseInt(product.id) >= parseInt(minimo.value) && parseInt(product.id) <= parseInt(maximo.value) //toma el id del producto y se fija si lo que escribimos en el buscador coincide
        ?product.classList.remove('filtro') // esto es una funcion pregunta, por lo que entendi. Si lo que escribimos en el buscador incluye el id del producto se le remueve la clase filtro
        :product.classList.add("filtro") // si no, se le agrega la clase filtro
      })
    }
  } else {
     if (e.target.matches('#rangeFilterCountMin')){ //si el parametro hace "match" con el buscador
      document.querySelectorAll(".producto").forEach(product =>{ //selecciona a todos los divs con clase producto y realiza la funcion para cada uno
        parseInt(product.id) >= parseInt(minimo.value)//toma el id del producto y se fija si lo que escribimos en el buscador coincide
          ?product.classList.remove('filtro') // esto es una funcion pregunta, por lo que entendi. Si lo que escribimos en el buscador incluye el id del producto se le remueve la clase filtro
          :product.classList.add("filtro") // si no, se le agrega la clase filtro
        });
      };
    };  
  e.stopPropagation();
};

function elMaximo (data, e){
  showProductsMinMax(data);
  if (minimo.value) {
    if (e.target.matches('#rangeFilterCountMax')){ //si el parametro hace "match" con el buscador
      document.querySelectorAll(".producto").forEach(product =>{ //selecciona a todos los divs con clase producto y realiza la funcion para cada uno
        parseInt(product.id) <= parseInt(maximo.value) && parseInt(product.id) >= parseInt(minimo.value) //toma el id del producto y se fija si lo que escribimos en el buscador coincide
          ?product.classList.remove('filtro') // esto es una funcion pregunta, por lo que entendi. Si lo que escribimos en el buscador incluye el id del producto se le remueve la clase filtro
          :product.classList.add("filtro") // si no, se le agrega la clase filtro
        })
      }
  } else {
    if (e.target.matches('#rangeFilterCountMax')){ //si el parametro hace "match" con el buscador
      document.querySelectorAll(".producto").forEach(product =>{ //selecciona a todos los divs con clase producto y realiza la funcion para cada uno
        parseInt(product.id) <= parseInt(maximo.value)//toma el id del producto y se fija si lo que escribimos en el buscador coincide
          ?product.classList.remove('filtro') // esto es una funcion pregunta, por lo que entendi. Si lo que escribimos en el buscador incluye el id del producto se le remueve la clase filtro
          :product.classList.add("filtro") // si no, se le agrega la clase filtro
        });
      };
    };
  e.stopPropagation();
};

function showProductsMinMax(data) {
  let htmlContentToAppend = "";
      for (let product of data.products) {        
        htmlContentToAppend += `
        <div class="container list-group m-4 producto" id="${product.cost}">
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
}

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
  fetchData(showProducts);
};




window.addEventListener('load', () => {
  fetchData(showProducts);
});

ordenar_asc.addEventListener('click', () => {
  fetchData(ordenar_menor_precio);  
});

ordenar_desc.addEventListener('click', () => {
  fetchData(ordenar_mayor_precio);  
});

ordenar_rel.addEventListener('click', () => {
  fetchData(ordenar_relevancia);  
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