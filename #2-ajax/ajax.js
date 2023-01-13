function getProductsUrl(keyword) {
  return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword, callbackSuccess, callbackError) {
  // Code AJAX Here!
  const ajax = new XMLHttpRequest();

  //   AJAX Callback
  ajax.onload = function () {
    if (ajax.status === 200) {
      const data = JSON.parse(ajax.responseText);
      callbackSuccess(data);
    } else {
      callbackError();
    }
  };

  const url = getProductsUrl(keyword);
  ajax.open("GET", url);
  ajax.send();

  // tidak bisa dilakukan secara sync
  // const response = JSON.parse(ajax.responseText);
  // console.log(response);
}

function getProductsError() {
  console.log("Error get products");
  alert("Error get products");
}

function clearProducts() {
  const productUl = document.getElementById("products");
  productUl.textContent = "";
}

function displayProducts(data) {
  data.data.products.forEach((product) => displayProduct(product));
}

function displayProduct(product) {
  const productLi = document.createElement("li");
  productLi.textContent = product.name;

  const productUl = document.getElementById("products");
  productUl.appendChild(productLi);
}

function clearTableProducts() {
  const productUl = document.getElementById("table-products");
  productUl.textContent = "";
}

function displayTableProducts(data) {
  const table = document.createElement("table");
  table.setAttribute("border", 1);

  let index = 0;
  data.data.products.forEach((product) => {
    table.insertRow(index).insertCell(0).innerText = product.name;
    index++;
  });

  const tableProduct = document.getElementById("table-products");
  tableProduct.appendChild(table);
}

function buttonClick() {
  getProducts(
    document.getElementById("keyword").value,
    function (data) {
      console.log(data);
    },
    function () {
      console.log("Error");
    }
  );

  getProducts(
    document.getElementById("keyword").value,
    function (data) {
      clearProducts();
      displayProducts(data);
    },
    function () {
      getProductsError();
    }
  );

  getProducts(
    document.getElementById("keyword").value,
    function (data) {
      clearTableProducts();
      displayTableProducts(data);
    },
    function () {
      getProductsError();
    }
  );

  console.log("Success Click Button");
}
