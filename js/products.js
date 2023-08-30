const categoria = localStorage.getItem('catID'); // Ya que los archivos index.js y categories.js ya incluyen la función de guardar la id de la
                                                 // categoría en localStorage, accedemos a ella
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoria + ".json"; // y reemplazamos en la url por la id de la api correspondiente
const container = document.getElementById("product-list");
const ordenar_desc = document.getElementById('priceDesc');
const ordenar_asc = document.getElementById('priceAsc');
const ordenar_rel = document.getElementById('rel');
const minimo = document.getElementById('rangeFilterCountMin');
const maximo = document.getElementById('rangeFilterCountMax');

function showProducts(products) {
    let htmlContentToAppend = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
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
    }

    container.innerHTML = htmlContentToAppend;
}


async function getProducts() {
    let response = await fetch(DATA_URL);
    if (response.ok){
        let data = await response.json();
        showProducts(data.products);
    } else {
        alert("ERROR!" + response.status);
    };
};

getProducts();

function ordenar_menor_precio(){
  //const para_borrar = document.getElementsByClassName('producto')
  //container.removeChild(para_borrar)
  fetch(DATA_URL)
  .then(respuesta => respuesta.json())
  .then(data => {
  let numeros = []
  let lista_ordenada_menor = []
  for (producto of data.products){
      numeros.push(producto.cost);
  }
  
  numeros.sort((a, b) => a - b);
  console.log(numeros);
  for (precio of numeros){
    for (producto of data.products){
      console.log(precio);
      console.log(producto);
      if (precio == producto.cost  && !(lista_ordenada_menor.includes(producto))){
        lista_ordenada_menor.push(producto);
      }
    }
  }


  console.log(lista_ordenada_menor)
  let htmlContentToAppend = "";

    for (let i = 0; i < lista_ordenada_menor.length; i++) {
        let product = lista_ordenada_menor[i];
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
    }
  container.innerHTML = htmlContentToAppend;
}
)}


ordenar_asc.addEventListener('click', ()=>{
  ordenar_menor_precio()
  
})

function ordenar_mayor_precio(){
  //const para_borrar = document.getElementsByClassName('producto')
  //container.removeChild(para_borrar)
  fetch(DATA_URL)
  .then(respuesta => respuesta.json())
  .then(data => {
  let numeros = []
  let lista_ordenada_mayor = []
  for (producto of data.products){
      numeros.push(producto.cost);
  }
  
  numeros.sort((a, b) => b - a);
  console.log(numeros);
  for (precio of numeros){
    for (producto of data.products){
      console.log(precio);
      console.log(producto);
      if (precio == producto.cost  && !(lista_ordenada_mayor.includes(producto))){
        lista_ordenada_mayor.push(producto);
      }
    }
  }


  console.log(lista_ordenada_mayor)
  let htmlContentToAppend = "";

    for (let i = 0; i < lista_ordenada_mayor.length; i++) {
        let product = lista_ordenada_mayor[i];
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
    }
  container.innerHTML = htmlContentToAppend;
}
)}


ordenar_desc.addEventListener('click', ()=>{
  ordenar_mayor_precio()
  
});

function ordenar_relevancia(){
  //const para_borrar = document.getElementsByClassName('producto')
  //container.removeChild(para_borrar)
  fetch(DATA_URL)
  .then(respuesta => respuesta.json())
  .then(data => {
  let numeros = []
  let lista_ordenada_relevancia = []
  for (producto of data.products){
      numeros.push(producto.soldCount);
  }
  
  numeros.sort((a, b) => b - a);
  console.log(numeros);
  for (vendidos of numeros){
    for (producto of data.products){
      console.log(vendidos);
      console.log(producto);
      if (vendidos == producto.soldCount  && !(lista_ordenada_relevancia.includes(producto))){
        lista_ordenada_relevancia.push(producto);
      }
    }
  }


  console.log(lista_ordenada_relevancia)
  let htmlContentToAppend = "";

    for (let i = 0; i < lista_ordenada_relevancia.length; i++) {
        let product = lista_ordenada_relevancia[i];
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
    }
  container.innerHTML = htmlContentToAppend;
}
)}


ordenar_rel.addEventListener('click', ()=>{
  ordenar_relevancia();
  
});

/* Otra forma:

fetch(DATA_URL)
.then(respuesta => respuesta.json())
.then(data => {
    showProducts(data)
    
})

*/

document.addEventListener('keyup', e =>{ //el evento keyup se acciona cuando apretamos alguna tecla. "e" es el parametro
  if (e.target.matches("#buscador")){ //si el parametro hace "match" con el buscador
    document.querySelectorAll(".producto").forEach(product =>{ //selecciona a todos los divs con clase producto y realiza la funcion para cada uno
      product.id.toLowerCase().includes(e.target.value.toLowerCase()) //toma el id del producto y se fija si lo que escribimos en el buscador coincide
        ?product.classList.remove('filtro') // esto es una funcion pregunta, por lo que entendi. Si lo que escribimos en el buscador incluye el id del producto se le remueve la clase filtro
        :product.classList.add("filtro") // si no, se le agrega la clase filtro
    })
  }
})

//En products.html agregue el buscador con el id="buscador". 
// En la funcion showProducts modifique la primer linea de lo que se apendea esto:
// <div class="container list-group m-4 producto" id="${product.name}">
// le agregue como id el nombre del producto para compararlo con la busqueda.
// en styles.css agregue la clase filtro para que cuando se le agrega al div no se vea.

minimo.addEventListener('keyup', e =>{ //el evento keyup se acciona cuando apretamos alguna tecla. "e" es el parametro
  fetch(DATA_URL)
  .then(respuesta => respuesta.json())
  .then(data => {
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
}
e.stopPropagation();
})
})


maximo.addEventListener('keyup', e =>{ //el evento keyup se acciona cuando apretamos alguna tecla. "e" es el parametro
  fetch(DATA_URL)
  .then(respuesta => respuesta.json())
  .then(data => {
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
  }
e.stopPropagation();
});
});


function showProductsMinMax(data) {
  let htmlContentToAppend = ``
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
    }
  container.innerHTML = htmlContentToAppend;
}

