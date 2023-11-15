const USER_ID = 25801;
const URL = `https://japceibal.github.io/emercado-api/user_cart/${USER_ID}.json`;
const DIV = document.getElementById('cartContent');
const TICKET = document.getElementById('ticket');
const SUB_TOTAL = document.querySelector('.sub-total');
const CONTINUE = document.getElementById('contCompra');
const HIDDEN_DIV = document.getElementById('divOculto');
const CONFIRM_PURCHASE = document.getElementById('btnSubmit');
const TO_PRINT = document.getElementById('imprimible');
const TOTAL_TO_PRINT = document.getElementById('total_imprimible');
const SUB_TOTAL_TICKET = document.getElementById('subTotal_ticket');
const currencyBtns = document.querySelectorAll('.currencyBtn');
let articles = [];
let cartContent = JSON.parse(sessionStorage.getItem('buyProduct'));
let totalGlobal = 0;


// Función para añadir el costo de envío
function trackDiscount(total, number) {
    const TOTAL_ELEMENT = document.getElementById('total');
    const DISCOUNT_ON = total + (total * number); 
    TOTAL_ELEMENT.textContent = `Total: ${selectedCur} ${DISCOUNT_ON.toFixed()}`;
    //TOTAL_TO_PRINT.textContent = `${selectedCur} ${DISCOUNT_ON.toFixed(2)}`;
    const DISCOUNT_TEXT = document.getElementById("descuento")
    DISCOUNT_TEXT.textContent = `    
    Envio: ${selectedCur} ${(total * number).toFixed()}
    `;

};


// Función para mostrar los productos en el carrito
async function showCart(data) {
  let exchangeRateUsd = await getExchangeRate('usd');
  let exchangeRateUyu = await getExchangeRate('uyu');
  let htmlContentToAppend = "";
  let subTotalHtml = "";
  articles = data.articles;
  // Añadimos los artículos de la api a cartContent
  articles.forEach(article => {
    if (cartContent != null){
      if (cartContent.indexOf(cartContent.find(prod => prod.id === article.id)) === -1){
        cartContent.push(article);
        sessionStorage.setItem('buyProduct', JSON.stringify(cartContent));
      };
    } else {
        cartContent = [];
        cartContent.push(article);
        sessionStorage.setItem('buyProduct', JSON.stringify(cartContent));
    };
  });
  if(cartContent != null){
    cartContent.forEach(product => {    
      htmlContentToAppend += `
        <div class="container-fluid list-group m-4 producto" id='${product.id}'>
            <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                <div class="col-3">
                    <img onclick="setProdID(${product.id})" src="${product.image}" alt="${product.name}" class="product-image img-thumbnail" style="cursor: pointer">
                </div>
                <div class="col-7">
                    <h2 class="product-name">${product.name}</h2>
                    <p id="product-cost${product.id}" class="product-cost" data-name='${product.name}' data-cost='${hasDiscount(product.id, (product.unitCost / exchangeRateUsd).toFixed(0))}' data-cur='${product.currency}'>${selectedCur} ${hasDiscount(product.id, (product.unitCost / exchangeRateUsd).toFixed(0))} c/u</p>
                </div>
                <div class="col-1">
                    <input id="input${product.id}" type="number" class='row contador' min="1" value="${product.count}" data-name='${product.name}' data-cur='${product.currency}' data-cost='${hasDiscount(product.id, (product.unitCost / exchangeRateUsd).toFixed(0))}' style="width: 2.5rem"/>
                </div>
                <div class="row">
                    <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                        <i id="icon${product.id}" class="row bin fa-solid fa-trash fa-xl" data-id='${product.id}'></i>
                    </div>
                </div>
            </div>
        </div>
      `;
    });
  } else {
    htmlContentToAppend = `
      <h2>El carrito está vacío... <a href='categories.html'>Llénalo!</a></h2>
    `
  };
  htmlContentToAppend += `
    <div class="empty-cart-btn d-flex justify-content-end align-items-center p-5">
        <button class="btn btn-danger" id="vaciarCarritoBtn">Vaciar Carrito</button>
    </div>
    `;
  DIV.innerHTML = htmlContentToAppend;

// Función para actualizar el precio en función de la moneda seleccionada
  function updatePrice(){
    const prodCost = document.querySelectorAll('.prodCost');
    prodCost.forEach(cost => {
      switch(cost.dataset.cur){
        case 'USD':
          cost.textContent = `${selectedCur} ${parseInt(cost.dataset.cost / exchangeRateUsd).toFixed(0)}`;
          break;
        
        case 'UYU':
          cost.textContent = `${selectedCur} ${parseInt(cost.dataset.cost / exchangeRateUyu).toFixed(0)}`;
          break;
      };
    });
  };

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', updatePrice);
  });
  
  updatePrice();


  const CART_ITEMS = document.querySelectorAll('.contador');
  const TOTAL_ELEMENT = document.getElementById('total');


  // Función para actualizar el carrito
  function updateCart() {

      let total = 0;
      let lista = [];
  
      CART_ITEMS.forEach(input => {
        const divID = input.id.substring(5)
        const divDelInput = document.getElementById(divID)
  
        if (!(input in lista) && !(divDelInput.classList.contains('hidden'))){
          lista.push(input)
        }
      })
  
      lista.forEach(input => {
        const itemQuantity = parseInt(input.value);
              const itemPrice = parseFloat(input.dataset.cost);
  
              total += itemQuantity * itemPrice;
              totalGlobal = total;
              if(PREMIUM.checked){
                trackDiscount(totalGlobal, 0.15);
              } else if (EXPRESS.checked){
                trackDiscount(totalGlobal, 0.07);
              } else if (STANDARD.checked){
                trackDiscount(totalGlobal, 0.05);
              } else{
                TOTAL_ELEMENT.textContent = `Total: ${selectedCur} ${total.toFixed()}`;
              }
      });   
        TOTAL_TO_PRINT.textContent = TOTAL_ELEMENT.textContent;
        SUB_TOTAL_TICKET.textContent = `Subtotal: ${selectedCur} ${total.toFixed()}`;
         
  };
  

  // Función para actualizar el ticket
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
        <div id='TICKET${input.id}' class='row'>
            <div class="col-6">
                <p>${input.dataset.name}</p>
                <p id='p${input.id}'>x${input.value}</p>
            </div>
            <div class="col-6">
                <p class="text-muted">${selectedCur} ${input.dataset.cost} c/u</p>
                <p id="cost${input.id}">${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}</p>
            </div>
            <hr>
        </div>
        
    `;
        SUB_TOTAL.innerHTML = subTotalHtml;

        TO_PRINT.innerHTML += `
        <tr>
            <td>${input.dataset.name}</td>
            <td id='td1${input.id}'>${input.value}</td>
            <td id='td2${input.id}'>${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}</td>
        </tr>
        `;
    };
           
  };

  CART_ITEMS.forEach(input => {
    updateTicket(input);
      input.addEventListener('input', () => {
        updateCart();
        updateTicket(input);
        input.setAttribute('value', input.value);
          cartContent[cartContent.indexOf(cartContent.find(prod => `input${prod.id}` === input.id))].count = input.value;
          sessionStorage.setItem('buyProduct', JSON.stringify(cartContent));
    }); 
  });

  
  
  updateCart();


  // Para eliminar productos del carrito
  let deleteIcons = document.querySelectorAll('.fa-trash');

  deleteIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const iconId = parseInt(icon.dataset.id);
        document.getElementById(`${iconId}`).classList.add('animate__animated', 'animate__slideOutLeft',);
        const prodToRemove = cartContent.find(prod => prod.id === iconId);
        console.log(prodToRemove)
        const prodToRemoveIndex = cartContent.indexOf(prodToRemove);
        if (prodToRemoveIndex != -1){
          cartContent.splice(prodToRemoveIndex, 1);
          sessionStorage.setItem('buyProduct', JSON.stringify(cartContent));
          const PRODUCTO_PARA_ELIMINAR = document.getElementById(`product-cost${prodToRemove.id}`);
          const CONTADOR_PRODUCTO_A_ELIMINAR = document.getElementById(`input${prodToRemove.id}`)
          totalGlobal = totalGlobal - (PRODUCTO_PARA_ELIMINAR.dataset.cost * CONTADOR_PRODUCTO_A_ELIMINAR.value);  
          SUB_TOTAL_TICKET.textContent = `Subtotal: ${selectedCur} ${totalGlobal.toFixed()}`;

          if(PREMIUM.checked){
            trackDiscount(totalGlobal, 0.15);
          } else if (EXPRESS.checked){
            trackDiscount(totalGlobal, 0.07);
          } else if (STANDARD.checked){
            trackDiscount(totalGlobal, 0.05);
          } else {
            TOTAL_ELEMENT.textContent = `Total: ${selectedCur} ${totalGlobal.toFixed()}`;
          }
          TOTAL_TO_PRINT.textContent = TOTAL_ELEMENT.textContent;
          
        };
        setTimeout(() => {
          document.getElementById(`${iconId}`).classList.add('hidden');
          location.reload();
        }, 1000);
      });
    });
  
  };



// Mostrar los productos del carrito al cargar la página
window.addEventListener('load', () => {
  fetchData(showCart, URL);
});



// Seleccionar tipo de envío
const PREMIUM = document.getElementById('premiumShipping');
const EXPRESS = document.getElementById('expressShipping');
const STANDARD = document.getElementById('standardShipping');
 

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


CONTINUE.addEventListener('click', ()=> {
    HIDDEN_DIV.removeAttribute('hidden');
});



// Métodos de pago
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
        CONFIRM_PURCHASE.removeAttribute('disabled');
    } else {
        CONFIRM_PURCHASE.setAttribute('disabled', '')
    }

    console.log(lista);
  });

  
});



// Cupón de descuento
const couponCodeInput = document.getElementById('coupon-code');
const applyCouponBtn = document.getElementById('apply-coupon');

applyCouponBtn.addEventListener('click', () => {
    const couponCode = couponCodeInput.value;
    if (couponCode === 'DESCUENTO10') {
        totalGlobal = totalGlobal * 0.9;
        const TOTAL_ELEMENT = document.getElementById('total');
        TOTAL_ELEMENT.textContent = `Total: ${selectedCur} ${totalGlobal.toFixed(2)}`;
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

 // Confirmar compra
CONFIRM_PURCHASE.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById("alert-success").classList.add("show");
  setTimeout(function() {
    document.getElementById("alert-success").classList.remove("show");
  }, 2000);
});

const E_TICKET = document.getElementById('e-Ticket');


// Función para imprimir ticket
function imprimirDiv(divId) {
    var content = document.getElementById(divId).innerHTML;
    var ventana = window.open('', 'PRINT', 'width=600,height=600'); // Esta variable la dejamos en español ya que "window" es una palabra reservada.
    
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
    
    ventana.document.write(content);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
    ventana.close();
};