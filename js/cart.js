const userId = 25801;
const url = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;
let CART_CONTENT = JSON.parse(sessionStorage.getItem('buyProduct'));
const DIV = document.getElementById('cartContent');
const ticket = document.getElementById('ticket');
const subTotal = document.querySelector('.sub-total');
let totalGlobal = 0;
const CONT_COMPRA = document.getElementById('contCompra');
const DIV_OCULTO = document.getElementById('divOculto');
const CONF_COMPRA = document.getElementById('btnSubmit');
let CONDICION = true;
const IMPRIMIBLE = document.getElementById('imprimible');
const TOTAL_IMPRIMIBLE = document.getElementById('total_imprimible');
const SUB_TOTAL_TICKET = document.getElementById('subTotal_ticket');
let articles = [];


async function showCart(data) {
  let apiProductRemoved = JSON.parse(sessionStorage.getItem('apiProdRemoved')) != null ?JSON.parse(sessionStorage.getItem('apiProdRemoved')) :[];
  const exchangeRateUsd = await getExchangeRate('usd');
  const exchangeRateUyu = await getExchangeRate('uyu');
  let htmlContentToAppend = "";
  let subTotalHtml = "";
  articles = data.articles;
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
  let countUpdate = sessionStorage.getItem('countUpd') != null ?sessionStorage.getItem('countUpd') :0;
  articles.forEach(article => {
    if (!apiProductRemoved.includes(article.id)){
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
                        <input type="number" class='contador row' id="${article.id}" min="1" value="${parseInt(parseInt(article.count) + parseInt(countUpdate))}" data-name='${article.name}' data-cur='${article.currency}' data-cost='${hasDiscount(article.id, (article.unitCost / exchangeRateUsd).toFixed(0))}' style="width: 5vh"/>
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
                        <input type="number" class='contador row' id="${article.id}" min="1" value="${parseInt(parseInt(article.count) + parseInt(countUpdate))}" data-name='${article.name}' data-cur='${article.currency}' data-cost='${hasDiscount(article.id, (article.unitCost / exchangeRateUyu).toFixed(0))}' style="width: 5vh"/>
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
    let total = 0;
    cartItems.forEach(input => {
        const itemQuantity = parseInt(input.value);
        const itemPrice = parseFloat(input.dataset.cost);
        
        total += itemQuantity * itemPrice;
        totalGlobal = total;
          
        totalElement.textContent = `Total: ${selectedCur} ${total.toFixed(2)}`;
        TOTAL_IMPRIMIBLE.textContent = `${selectedCur} ${total.toFixed(2)}`;
        SUB_TOTAL_TICKET.textContent = `Subtotal: ${selectedCur} ${total.toFixed(2)}`;
    });  
  };
  
  function updateTicket(input){
    const text = document.getElementById(`p${input.id}`);
    const cost = document.getElementById(`cost${input.id}`);
    const valor_imprimible = document.getElementById(`td1${input.id}`);
    const precio_imprimible = document.getElementById(`td2${input.id}`);

    if(text){
        text.textContent = `x${input.value}`;
        cost.textContent = `${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}`;
        valor_imprimible.textContent = `${input.value}`;
        precio_imprimible.textContent = `${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}`;
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

        IMPRIMIBLE.innerHTML += `
        <tr>
            <td>${input.dataset.name}</td>
            <td id='td1${input.id}'>${input.value}</td>
            <td id='td2${input.id}'>${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}</td>
        </tr>
        `;
    };
           
  };

  cartItems.forEach(input => {
    updateTicket(input);
      input.addEventListener('input', () => {
        updateCart();
        updateTicket(input);
        input.setAttribute('value', input.value);
        const isFromApi = articles.find(art => art.id === parseInt(input.id)) ?true :false;
        if (isFromApi){
          countUpdate = input.value - 1;
          sessionStorage.setItem('countUpd', countUpdate);
        } else {
          CART_CONTENT[CART_CONTENT.indexOf(CART_CONTENT.find(prod => prod.id === parseInt(input.id)))].count = input.value;
          sessionStorage.setItem('buyProduct', JSON.stringify(CART_CONTENT));
        };
    }); 
  });

  
  
  updateCart();


  // Para eliminar productos del carrito
  let deleteIcons = document.querySelectorAll('.fa-trash');

  deleteIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const iconId = parseInt(icon.dataset.id);
        document.getElementById(`${iconId}`).classList.add('animate__animated', 'animate__slideOutLeft');
        const prodToRemove = CART_CONTENT.find(prod => prod.id === iconId);
        const prodToRemoveIndex = CART_CONTENT.indexOf(prodToRemove);
        const isFromApi = articles.find(art => art.id === iconId) ?true :false;
        if (isFromApi){
          apiProductRemoved.push(iconId);
          sessionStorage.setItem('apiProdRemoved', JSON.stringify(apiProductRemoved));
        };
        if (prodToRemoveIndex != -1 && !isFromApi){
          CART_CONTENT.splice(prodToRemoveIndex, 1);
          sessionStorage.setItem('buyProduct', JSON.stringify(CART_CONTENT));
        };
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
    TOTAL_IMPRIMIBLE.textContent = `${selectedCur} ${conDescuento.toFixed(2)}`;
    const discountText = document.getElementById("descuento")
    discountText.textContent = `    
    Envio: ${selectedCur} ${(total * number).toFixed(2)}
    `;

};


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


CONT_COMPRA.addEventListener('click', ()=> {
    DIV_OCULTO.removeAttribute('hidden');
})


const tarjetaMaster = document.getElementById('tarjetaMaster');
const tarjetaMaestro = document.getElementById('tarjetaMaestro');
const tarjetaVisa = document.getElementById('tarjetaVisa');
const master = document.getElementById('master');
const maestro = document.getElementById('maestro');
const visa = document.getElementById('visa');
const transferenciaOptions= document.getElementById('transferenciaOptions');
const INPUTS_ENVIOS = document.querySelectorAll('.envio');
let lista = [];
let numeroInputs = 0

INPUTS_ENVIOS.forEach(element => {
  element.addEventListener('input', () => {
    let index = lista.indexOf(element.id)

    if (!element.checkValidity()) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      lista.splice(index, 1)

    } else {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      
      const listaIndex = lista.findIndex(e_element => e_element === element.id);
      if (listaIndex === -1) {
        lista.push(element.id);
      } 
    }


     
    function indexReplace(list, elemento){
        let i = list.indexOf(elemento)
        if (i != -1){
            list.splice(i, 1)
        }
    }
    switch(element.id){
        case 'radioTransferencia':
            indexReplace(lista, 'radioCredito')
            document.getElementById('creditoOptions').style.display='none'
            indexReplace(lista, 'master')
            indexReplace(lista, 'maestro')
            indexReplace(lista, 'visa')
            indexReplace(lista, 'tarjetaNumeroMaster')
            indexReplace(lista, 'tarjetaNumeroMaestro')
            indexReplace(lista, 'tarjetaNumeroVisa')
            indexReplace(lista, 'tarjetaNombreMaster')
            indexReplace(lista, 'tarjetaNombreMaestro')
            indexReplace(lista, 'tarjetaNombreVisa')
            indexReplace(lista, 'tarjetaFechaMaster')
            indexReplace(lista, 'tarjetaFechaMaestro')
            indexReplace(lista, 'tarjetaFechaVisa')
            numeroInputs = 7
            break;

        case 'radioCredito':
            indexReplace(lista, 'radioTransferencia')
            indexReplace(lista, 'brou')
            indexReplace(lista, 'bbva')
            indexReplace(lista, 'santander')
            creditoOptions.style.display = 'block'
            numeroInputs = 10
            break;
        
        case 'brou':
            indexReplace(lista, 'bbva')
            indexReplace(lista, 'santander')
            break;

        case 'bbva':
            indexReplace(lista, 'brou')
            indexReplace(lista, 'santander')
            break;

        case 'santander':
            indexReplace(lista, 'bbva')
            indexReplace(lista, 'brou')
            break;
            

        case 'premiumShipping':
            indexReplace(lista, 'expressShipping')
            indexReplace(lista, 'standardShipping')
            break;
        
        case 'expressShipping':
            indexReplace(lista, 'premiumShipping')
            indexReplace(lista, 'standardShipping')
            break;

        case 'standardShipping':
            indexReplace(lista, 'premiumShipping')
            indexReplace(lista, 'expressShipping')
            break;
        
        case 'master':
            indexReplace(lista, 'maestro')
            indexReplace(lista, 'visa')
            indexReplace(lista, 'tarjetaNumeroMaestro')
            indexReplace(lista, 'tarjetaNumeroVisa')
            indexReplace(lista, 'tarjetaNombreMaestro')
            indexReplace(lista, 'tarjetaNombreVisa')
            indexReplace(lista, 'tarjetaFechaMaestro')
            indexReplace(lista, 'tarjetaFechaVisa')
            break;
        
        case 'maestro':
            indexReplace(lista, 'master')
            indexReplace(lista, 'visa')
            indexReplace(lista, 'tarjetaNumeroMaster')
            indexReplace(lista, 'tarjetaNumeroVisa')
            indexReplace(lista, 'tarjetaNombreMaster')
            indexReplace(lista, 'tarjetaNombreVisa')
            indexReplace(lista, 'tarjetaFechaMaster')
            indexReplace(lista, 'tarjetaFechaVisa')
            break;
        
        case 'visa':
            indexReplace(lista, 'maestro')
            indexReplace(lista, 'master')
            indexReplace(lista, 'tarjetaNumeroMaster')
            indexReplace(lista, 'tarjetaNumeroMaestro')
            indexReplace(lista, 'tarjetaNombreMaster')
            indexReplace(lista, 'tarjetaNombreMaestro')
            indexReplace(lista, 'tarjetaFechaMaster')
            indexReplace(lista, 'tarjetaFechaMaestro')
            break;
    }

    
    if (lista.length === numeroInputs) {
        CONF_COMPRA.removeAttribute('disabled');
    } else {
        CONF_COMPRA.setAttribute('disabled', '')
    }

    console.log(lista);
  });

  
});


const couponCodeInput = document.getElementById('coupon-code');
const applyCouponBtn = document.getElementById('apply-coupon');

applyCouponBtn.addEventListener('click', () => {
    const couponCode = couponCodeInput.value;
    if (couponCode === 'DESCUENTO10') {
        totalGlobal = totalGlobal * 0.9;
        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: ${selectedCur} ${totalGlobal.toFixed(2)}`;
        couponCodeInput.value = '';
        alert('Cupón aplicado con éxito.');
    } else {
        alert('Cupón no válido. Por favor, verifica el código.');
    }
});


radioTransferencia.addEventListener('change', function() {
  if (radioTransferencia.checked) {
    transferenciaOptions.style.display = 'block';
    creditoOptions.style.display = 'none'; 
  } else {
    transferenciaOptions.style.display = 'none';
  }
});

radioCredito.addEventListener('change', function() {
  if (radioCredito.checked) {
    creditoOptions.style.display = 'block';
    transferenciaOptions.style.display = 'none';
  } else {
    creditoOptions.style.display = 'none'; 
  }
  master.addEventListener('change', function(){
    if (master.checked) {
      tarjetaMaster.style.display = 'block';
      tarjetaMaestro.style.display = 'none';
      tarjetaVisa.style.display = 'none';
    }else {
      tarjetaMaster.style.display = 'none';

    }
  })
  maestro.addEventListener('change', function(){
    if (maestro.checked) {
      tarjetaMaestro.style.display = 'block';
      tarjetaMaster.style.display = 'none';
      tarjetaVisa.style.display = 'none';
    }else {
      tarjetaMaestro.style.display = 'none';

    }
  }) 
visa.addEventListener('change', function(){
    if (visa.checked) {
      tarjetaVisa.style.display = 'block';
      tarjetaMaestro.style.display = 'none';
      tarjetaMaster.style.display = 'none';
    }else {
      tarjetaVisa.style.display = 'none'
    }
  })
  creditRadios.forEach(radio => {
    radio.disabled = !radioCredito.checked;
  });
});


CONF_COMPRA.addEventListener('click', () => {
  document.getElementById("alert-success").classList.add("show");
  setTimeout(function() {
    document.getElementById("alert-success").classList.remove("show");
  }, 2000);
});

const E_TICKET = document.getElementById('e-Ticket');
const BOTON_TICKET = document.getElementById;

function imprimirDiv(divId) {
    var contenido = document.getElementById(divId).innerHTML;
    var ventana = window.open('', 'PRINT', 'width=600,height=600');
    
    ventana.document.open();
    ventana.document.write('<html><head><title>Imprimir Ticket</title><style>');
    ventana.document.write('@media print {');
    ventana.document.write('  body { font-family: Arial, sans-serif; }');
    ventana.document.write('  table { width: 100%; border-collapse: collapse; }');
    ventana.document.write('  td { padding: 8px; border: 1px solid #000; }');
    ventana.document.write('  .titulo { font-weight: bold; }');
    ventana.document.write('  #total_imprimible { font-weight: bold; }');
    ventana.document.write('}');
    ventana.document.write('</style></head><body>');
    
    ventana.document.write(contenido);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
    ventana.close();
};