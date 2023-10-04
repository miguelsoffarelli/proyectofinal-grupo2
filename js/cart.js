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
      if(articleIndex === -1) {
        htmlContentToAppend += `
          <div class="container list-group m-4 producto cursor-active">
            <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
              <div class="col-3">
                <img src="${product.img}" alt="${product.name}" class="product-image img-thumbnail">
              </div>
              <div class="col-7">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-cost">${(hasDiscount(product.id, product.cost)) * product.count}</p>
              </div>
              <div class="col-1">
                <input type="number" id="counter" min="1" value="${product.count}" style="width: 5vh"/>
              </div>
            </div>
          </div>
      `;
      } else {
        articles[articleIndex].count += product.count;
      };
    });
    articles.forEach(article => {
        htmlContentToAppend += `
          <div class="container list-group m-4 producto cursor-active">
            <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
              <div class="col-3">
                <img src="${article.image}" alt="${article.name}" class="product-image img-thumbnail">
              </div>
              <div class="col-7">
                <h2 class="product-name">${article.name}</h2>
                <p class="product-cost">${(hasDiscount(article.id, article.unitCost)) * article.count}</p>
              </div>
              <div class="col-1">
                <input type="number" id="counter" min="1" value="${article.count}" style="width: 5vh"/>
              </div>
            </div>
          </div>
      `;
    });
    DIV.innerHTML = htmlContentToAppend;
  };

  window.addEventListener('load', () => {
    fetchData(showCart, url);
  })