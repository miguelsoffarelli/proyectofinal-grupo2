console.log(sessionStorage.getItem('buyProduct'));

const userId = 25801;
const url = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;
const CART_CONTENT = JSON.parse(sessionStorage.getItem('buyProduct'));
const DIV = document.getElementById('cartContent');
const ticket = document.getElementById('ticket');




async function showCart(data) {
  const exchangeRateUsd = await getExchangeRate('usd');
  const exchangeRateUyu = await getExchangeRate('uyu');
  let htmlContentToAppend = "";
  const articles = data.articles;
  if(CART_CONTENT != null){
    CART_CONTENT.forEach(product => {
        const articleIndex = articles.findIndex(article => article.id === product.id);
        if (articleIndex === -1) {
            htmlContentToAppend += `
                <div class="container-fluid list-group m-4 producto">
                    <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                        <div class="col-3">
                            <img src="${product.img}" alt="${product.name}" class="product-image img-thumbnail">
                        </div>
                        <div class="col-7">
                            <h2 class="product-name">${product.name}</h2>
                            <p class="product-cost" data-name='${product.name}' data-cost='${hasDiscount(product.id, product.cost)}'>${product.currency} ${hasDiscount(product.id, product.cost)} c/u</p>
                        </div>
                        <div class="col-1">
                            <input type="number" class='row contador' id="${product.id}" min="1" value="${product.count}" data-cur='${product.currency}' data-cost='${hasDiscount(product.id, product.cost)}' style="width: 2.5rem"/>
                        </div>
                        <div class="row">
                            <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                                <i class="row bin fa-solid fa-trash fa-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            articles[articleIndex].count += product.count;
        }
    });
  };
  articles.forEach(article => {
      htmlContentToAppend += `
          <div class="container list-group m-4 producto">
              <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                  <div class="col-3">
                      <img src="${article.image}" alt="${article.name}" class="product-image img-thumbnail">
                  </div>
                  <div class="col-7">
                      <h2 class="product-name">${article.name}</h2>
                      <p class="product-cost" data-name='${article.name}' data-cost='${hasDiscount(article.id, article.unitCost)}'>${article.currency} ${hasDiscount(article.id, article.unitCost)} c/u</p>
                  </div>
                  <div class="col-1">
                      <input type="number" class='contador row' id="${article.id}" min="1" value="${article.count}" data-cur='${article.currency}' data-cost='${hasDiscount(article.id, article.unitCost)}' style="width: 5vh"/>
                  </div>
                  <div class="row">
                      <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                          <i class="row bin fa-solid fa-trash fa-xl"></i>
                      </div>
                  </div>
              </div>
          </div>
      `;
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
        const itemCur = input.dataset.cur;
        
        total += itemQuantity * itemPrice;
        if(itemCur === 'USD'){
          totalElement.textContent = `Total: ${selectedCur} ${(total / exchangeRateUsd).toFixed(2)}`;
        } else if(itemCur === 'UYU'){
          totalElement.textContent = `Total: ${selectedCur} ${(total / exchangeRateUyu).toFixed(2)}`;
        };
    });  
  };

  cartItems.forEach(input => {
      input.addEventListener('input', () => {
        updateCart();
        input.setAttribute('value', input.value);
    }); 
  });

  updateCart();
};

window.addEventListener('load', () => {
  fetchData(showCart, url);
});


