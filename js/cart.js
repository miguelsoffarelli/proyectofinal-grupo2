console.log(sessionStorage.getItem('buyProduct'));

const userId = 25801;
const url = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;
const CART_CONTENT = JSON.parse(sessionStorage.getItem('buyProduct'));
const DIV = document.getElementById('cartContent');

function showCart(data) {
  let htmlContentToAppend = "";
  const articles = data.articles;
  CART_CONTENT.forEach(product => {
      const articleIndex = articles.findIndex(article => article.id === product.id);
      if (articleIndex === -1) {
          htmlContentToAppend += `
              <div class="container list-group m-4 producto">
                  <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                      <div class="col-3">
                          <img src="${product.img}" alt="${product.name}" class="product-image img-thumbnail">
                      </div>
                      <div class="col-7">
                          <h2 class="product-name">${product.name}</h2>
                          <p class="product-cost" data-name='${product.name}' data-cost='${hasDiscount(product.id, product.cost)}'>${hasDiscount(product.id, product.cost)}</p>
                      </div>
                      <div class="col-1">
                          <input type="number" class='row contador' id="${product.id}" min="1" value="${product.count}" data-cost='${hasDiscount(product.id, product.cost)}' style="width: 5vh"/>
                          <i class="xmark fa-solid fa-square-xmark"></i>
                      </div>
                  </div>
              </div>
          `;
      } else {
          articles[articleIndex].count += product.count;
      }
  });
  articles.forEach(article => {
      htmlContentToAppend += `
          <div class="container list-group m-4 producto">
              <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
                  <div class="col-3">
                      <img src="${article.image}" alt="${article.name}" class="product-image img-thumbnail">
                  </div>
                  <div class="col-7">
                      <h2 class="product-name">${article.name}</h2>
                      <p class="product-cost" data-name='${article.name}' data-cost='${hasDiscount(article.id, article.unitCost)}'>${hasDiscount(article.id, article.unitCost)} c/u</p>
                  </div>
                  <div class="col-1">
                      <input type="number" class='contador row' id="${article.id}" min="1" value="${article.count}" data-cost='${hasDiscount(article.id, article.unitCost)}' style="width: 5vh"/>
                      <i class="row bin fa-solid fa-trash fa-xl"></i>
                  </div>
              </div>
          </div>
      `;
  });
  
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
      });

      totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }


  cartItems.forEach(input => {
      input.addEventListener('input', updateCart); 
  });


  updateCart();
}

window.addEventListener('load', () => {
  fetchData(showCart, url);
});


