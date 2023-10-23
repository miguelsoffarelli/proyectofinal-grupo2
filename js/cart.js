console.log(sessionStorage.getItem('buyProduct'));

const userId = 25801;
const url = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;
const CART_CONTENT = JSON.parse(sessionStorage.getItem('buyProduct'));
const DIV = document.getElementById('cartContent');
const ticket = document.getElementById('ticket');
const subTotal = document.querySelector('.sub-total');
let totalGlobal = 0;
const CONT_COMPRA = document.getElementById('contCompra')
const DIV_OCULTO = document.getElementById('divOculto')
const CONF_COMPRA = document.getElementById('btnSubmit')
let CONDICION = true

async function showCart(data) {
  const exchangeRateUsd = await getExchangeRate('usd');
  const exchangeRateUyu = await getExchangeRate('uyu');
  let htmlContentToAppend = "";
  let subTotalHtml = "";
  const articles = data.articles;
  if(CART_CONTENT != null){
    CART_CONTENT.forEach(product => {
        const articleIndex = articles.findIndex(article => article.id === product.id);
        if (articleIndex === -1) {
            if(product.currency === 'USD'){
                htmlContentToAppend += `
                <div class="container-fluid list-group m-4 producto" id='${product.id}'>
                    <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                        <div class="col-3">
                            <img src="${product.img}" alt="${product.name}" class="product-image img-thumbnail">
                        </div>
                        <div class="col-7">
                            <h2 class="product-name">${product.name}</h2>
                            <p class="product-cost" data-name='${product.name}' data-cost='${hasDiscount(product.id, (product.cost / exchangeRateUsd).toFixed(0))}'>${selectedCur} ${hasDiscount(product.id, (product.cost / exchangeRateUsd).toFixed(0))} c/u</p>
                        </div>
                        <div class="col-1">
                            <input type="number" class='row contador' id="${product.id}" min="1" value="${product.count}" data-name='${product.name}' data-cur='${product.currency}' data-cost='${hasDiscount(product.id, (product.cost / exchangeRateUsd).toFixed(0))}' style="width: 2.5rem"/>
                        </div>
                        <div class="row">
                            <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                                <i class="row bin fa-solid fa-trash fa-xl" data-id='${product.id}'></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            } else if (product.currency === 'UYU') {
                htmlContentToAppend += `
                <div class="container-fluid list-group m-4 producto" id='${product.id}'>
                    <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                        <div class="col-3">
                            <img src="${product.img}" alt="${product.name}" class="product-image img-thumbnail">
                        </div>
                        <div class="col-7">
                            <h2 class="product-name">${product.name}</h2>
                            <p class="product-cost" data-name='${product.name}' data-cost='${hasDiscount(product.id, (product.cost / exchangeRateUyu).toFixed(0))}'>${selectedCur} ${hasDiscount(product.id, (product.cost / exchangeRateUyu).toFixed(0))} c/u</p>
                        </div>
                        <div class="col-1">
                            <input type="number" class='row contador' id="${product.id}" min="1" value="${product.count}" data-name='${product.name}' data-cur='${product.currency}' data-cost='${hasDiscount(product.id, (product.cost / exchangeRateUyu).toFixed(0))}' style="width: 2.5rem"/>
                        </div>
                        <div class="row">
                            <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                                <i class="row bin fa-solid fa-trash fa-xl" data-id='${product.id}'></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            };
            
        } else {
            articles[articleIndex].count += product.count;
        }
    });
  };
  articles.forEach(article => {
    if (article.currency === 'USD'){
        htmlContentToAppend += `
          <div class="container list-group m-4 producto" id='${article.id}'>
              <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                  <div class="col-3">
                      <img src="${article.image}" alt="${article.name}" class="product-image img-thumbnail">
                  </div>
                  <div class="col-7">
                      <h2 class="product-name">${article.name}</h2>
                      <p class="product-cost" data-name='${article.name}' data-cost='${hasDiscount(article.id, (article.unitCost / exchangeRateUsd).toFixed(0))}'>${selectedCur} ${hasDiscount(article.id, (article.unitCost / exchangeRateUsd).toFixed(0))} c/u</p>
                  </div>
                  <div class="col-1">
                      <input type="number" class='contador row' id="${article.id}" min="1" value="${article.count}" data-name='${article.name}' data-cur='${article.currency}' data-cost='${hasDiscount(article.id, (article.unitCost / exchangeRateUsd).toFixed(0))}' style="width: 5vh"/>
                  </div>
                  <div class="row">
                      <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                          <i class="row bin fa-solid fa-trash fa-xl" data-id='${article.id}'></i>
                      </div>
                  </div>
              </div>
          </div>
      `;
    } else if (article.currency === 'UYU'){
        htmlContentToAppend += `
          <div class="container list-group m-4 producto" id='${article.id}'>
              <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                  <div class="col-3">
                      <img src="${article.image}" alt="${article.name}" class="product-image img-thumbnail">
                  </div>
                  <div class="col-7">
                      <h2 class="product-name">${article.name}</h2>
                      <p class="product-cost" data-name='${article.name}' data-cost='${hasDiscount(article.id, (article.unitCost / exchangeRateUyu).toFixed(0))}'>${selectedCur} ${hasDiscount(article.id, (article.unitCost / exchangeRateUyu).toFixed(0))} c/u</p>
                  </div>
                  <div class="col-1">
                      <input type="number" class='contador row' id="${article.id}" min="1" value="${article.count}" data-name='${article.name}' data-cur='${article.currency}' data-cost='${hasDiscount(article.id, (article.unitCost / exchangeRateUyu).toFixed(0))}' style="width: 5vh"/>
                  </div>
                  <div class="row">
                      <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                          <i class="row bin fa-solid fa-trash fa-xl" data-id='${article.id}'></i>
                      </div>
                  </div>
              </div>
          </div>
      `;
    };
      
  });
  htmlContentToAppend += `
    <div class="empty-cart-btn d-flex justify-content-end align-items-center p-5">
        <button class="btn btn-danger" id="vaciarCarritoBtn">Vaciar Carrito</button>
    </div>
    `;
  DIV.innerHTML = htmlContentToAppend;

  
  const cartItems = document.querySelectorAll('.contador');
  const totalElement = document.getElementById('total');

  function updateCart() {
    console.log('funcionando')
    let total = 0;
    cartItems.forEach(input => {
        const itemQuantity = parseInt(input.value);
        const itemPrice = parseFloat(input.dataset.cost);
        
        total += itemQuantity * itemPrice;
        totalGlobal = total;
          
        totalElement.textContent = `Total: ${selectedCur} ${total.toFixed(2)}`;
        
    });  
  };
  
  function updateTicket(input){
    const text = document.getElementById(`p${input.id}`);
    const cost = document.getElementById(`cost${input.id}`);
    if(text){
        text.textContent = `x${input.value}`
        cost.textContent = `${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}`
    } else {
        subTotalHtml += `
        <div id='${input.id}' class='row'>
            <div class="col-6">
                <p>${input.dataset.name}</p>
                <p id='p${input.id}'>x${input.value}</p>
            </div>
            <div class="col-6">
                <p class="text-muted">${selectedCur} ${input.dataset.cost} c/u</p>
                <p id="cost${input.id}">${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}</p>
            </div>
        </div>
        <hr>
    `;
        subTotal.innerHTML = subTotalHtml;
    };
           
  };

  cartItems.forEach(input => {
    updateTicket(input);
      input.addEventListener('input', () => {
        updateCart();
        updateTicket(input);
        input.setAttribute('value', input.value);
    }); 
  });

  
  
  updateCart();

  let deleteIcons = document.querySelectorAll('.fa-trash');

  deleteIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        document.getElementById(`${icon.dataset.id}`).classList.add('animate__animated', 'animate__slideOutLeft');
        setTimeout(() => {
            document.getElementById(`${icon.dataset.id}`).remove();
        }, 1000);
      });
    });
  };

window.addEventListener('load', () => {
  fetchData(showCart, url);
});




const PREMIUM = document.getElementById('premiumShipping');
const EXPRESS = document.getElementById('expressShipping');
const STANDARD = document.getElementById('standardShipping');
 
function trackDiscount(total, number) {
    const totalElement = document.getElementById('total');
    const conDescuento = total + (total * number); 
    totalElement.textContent = `Total: ${selectedCur} ${conDescuento.toFixed(2)}`;
    const discountText = document.getElementById("descuento")
    discountText.textContent = `    
    Envio: ${selectedCur} ${(total * number).toFixed(2)}
    `
}
PREMIUM.addEventListener('click', () => {
    trackDiscount(totalGlobal, 0.15);
});
EXPRESS.addEventListener('click', () => {
    trackDiscount(totalGlobal, 0.07);
});
STANDARD.addEventListener('click', () => {
    trackDiscount(totalGlobal, 0.05);
});


const radioTransferencia = document.getElementById('radioTransferencia');
const radioCredito = document.getElementById('radioCredito');
const creditoOptions = document.getElementById('creditoOptions');
const creditRadios = document.querySelectorAll('input[name="creditOption"]');


radioCredito.addEventListener('change', function() {
  creditoOptions.style.display = radioCredito.checked ? 'block' : 'none';

  creditRadios.forEach(radio => {
    radio.disabled = !radioCredito.checked;
  });
});

CONT_COMPRA.addEventListener('click', ()=> {
    DIV_OCULTO.removeAttribute('hidden');
})

const INPUTS_ENVIOS = document.querySelectorAll('.envio');
let lista = [];

INPUTS_ENVIOS.forEach(element => {
  element.addEventListener('input', () => {
    if (!element.checkValidity()) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      lista.pop(element.id)
      if (lista.length < 4) {
        CONF_COMPRA.setAttribute('disabled', '');
      } 

    } else {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      
      const listaIndex = lista.findIndex(e_element => e_element === element.id);
      if (listaIndex === -1) {
        lista.push(element.id);
      } 
    }

    if (lista.length >= 4) {
      CONF_COMPRA.removeAttribute('disabled');
    } 

    console.log(lista);
  });
});

CONF_COMPRA.addEventListener('click', () => {
  document.getElementById("alert-success").classList.add("show");
  setTimeout(function() {
    document.getElementById("alert-success").classList.remove("show");
  }, 2000);
});

