console.log(sessionStorage.getItem('buyProduct'));

const userId = 25801;
const url = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;
const CART_CONTENT = JSON.parse(sessionStorage.getItem('buyProduct'));
const DIV = document.getElementById('cartContent');
const ticket = document.getElementById('ticket');
const subTotal = document.querySelector('.sub-total');
let totalGlobal = 0;
const IMPRIMIBLE = document.getElementById('imprimible')
const TOTAL_IMPRIMIBLE = document.getElementById('total_imprimible')



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
                <div class="container-fluid list-group m-4 producto" style="min-width: 25rem">
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
                                <i class="row bin fa-solid fa-trash fa-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            } else if (product.currency === 'UYU') {
                htmlContentToAppend += `
                <div class="container-fluid list-group m-4 producto">
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
                                <i class="row bin fa-solid fa-trash fa-xl"></i>
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
          <div class="container list-group m-4 producto">
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
                          <i class="row bin fa-solid fa-trash fa-xl"></i>
                      </div>
                  </div>
              </div>
          </div>
      `;
    } else if (article.currency === 'UYU'){
        htmlContentToAppend += `
          <div class="container list-group m-4 producto">
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
                          <i class="row bin fa-solid fa-trash fa-xl"></i>
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
        TOTAL_IMPRIMIBLE.textContent = `${selectedCur} ${total.toFixed(2)}`;
        
    });  
  };
  
  function updateTicket(input){
    const text = document.getElementById(`p${input.id}`);
    const cost = document.getElementById(`cost${input.id}`);
    const valor_imprimible = document.getElementById(`td1${input.id}`)
    const precio_imprimible = document.getElementById(`td2${input.id}`)

    if(text){
        text.textContent = `x${input.value}`
        cost.textContent = `${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}`
        valor_imprimible.textContent = `${input.value}`
        precio_imprimible.textContent = `${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}`
    } else {
        subTotalHtml += `
        <div id='${input.id}' class='row'>
            <div class="col-6 producto">
                <p>${input.dataset.name}</p>
                <p id='p${input.id}'>x${input.value}</p>
            </div>
            <div class="col-6 costo">
                <p class="text-muted">${selectedCur} ${input.dataset.cost} c/u</p>
                <p id="cost${input.id}">${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}</p>
            </div>
        </div>
        
    `;
        subTotal.innerHTML = subTotalHtml;

        IMPRIMIBLE.innerHTML += `
        <tr>
            <td>${input.dataset.name}</td>
            <td id='td1${input.id}'>${input.value}</td>
            <td id='td2${input.id}'>${selectedCur} ${(parseInt(input.dataset.cost) * input.value)}</td>
        </tr>
        `
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
    TOTAL_IMPRIMIBLE.textContent = `${selectedCur} ${conDescuento.toFixed(2)}`
    const discountText = document.getElementById("descuento")
    discountText.textContent = `${selectedCur} ${(total * number).toFixed(2)}`
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

const E_TICKET = document.getElementById('e-Ticket')
const BOTON_TICKET = document.getElementById('imprimir_ticket')

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
}


