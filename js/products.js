const categoria = localStorage.getItem('catID'); // Ya que los archivos index.js y categories.js ya incluyen la función de guardar la id de la
                                                 // categoría en localStorage, accedemos a ella
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoria + ".json"; // y reemplazamos en la url por la id de la api correspondiente
const container = document.getElementById("product-list");
const ordenar_mayor = document.getElementById('ordenar_mayor')

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

function ordenar_mayor_precio(){
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
      if (precio.value == producto.cost.value  && !(lista_ordenada_menor.includes(producto))){
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


ordenar_mayor.addEventListener('click', ()=>{
  ordenar_mayor_precio()
  
})



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






