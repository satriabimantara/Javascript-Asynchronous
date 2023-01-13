// Get backend URL example BliBli API
function getProductsURL(keyword) {
  return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword, callbackSuccess, callbackError) {
  // Panggil AJAX
  const ajax = new XMLHttpRequest();

  //   AJAX Callback
  ajax.onload = function () {
    // check status berhasil 200
    if (ajax.status == 200) {
      // Ambil data yang berhasil diretriev
      const data = JSON.parse(ajax.responseText);

      console.log("Success Retrieve Data");
      callbackSuccess(data);
    } else {
      // Lakukan suatu hal ketika komunikasi AJAX gagal (error)
      callbackError();
    }
  };
  ajax.open("GET", getProductsURL(keyword));
  ajax.send();
}

function clearProducts() {
  let productUl = document.getElementById("products");
  productUl.textContent = "";
}

function displayProduct(product) {
  let productLi = document.createElement("li");
  productLi.textContent = product.name;

  let productUl = document.getElementById("products");
  productUl.append(productLi);
}
function displayProducts(data) {
  data.data.products.forEach((product) => {
    displayProduct(product);
  });
}

function buttonClick() {
  // Ambil keyword di text input
  const keyword = document.getElementById("keyword").value;
  getProducts(
    keyword,
    function (data) {
      clearProducts();
      displayProducts(data);
    },
    function () {
      alert("Error retrieve data");
    }
  );
}
