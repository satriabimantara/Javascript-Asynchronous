// Get backend URL example BliBli API
function getProductsURL(keyword) {
  return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword) {
  // Code Promise Here!
  const promise = new Promise(function (resolve, reject) {
    // Code async here
    const ajax = new XMLHttpRequest();
    ajax.onload = function () {
      if (ajax.status == 200) {
        const data = JSON.parse(ajax.responseText);
        console.log("Success Retrieve Data");
        resolve(data);
      } else {
        reject(Error("Error Retrieve data"));
      }
    };
    ajax.open("GET", getProductsURL(keyword));
    ajax.send();
  });
  return promise;
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

  // promise dari function getProducts
  const promise = getProducts(keyword);

  // ambil value dari promise
  promise
    .then(function (data) {
      // ambil hanya products dari data
      return data.data.products;
    })
    .then(function (products) {
      products.forEach((product) => {
        clearProducts();
        displayProduct(product);
      });
    })
    .catch(function (error) {
      alert(error.message);
    })
    .finally(function () {
      console.log(
        "Blok kode yang dijalankan Promise baik saat sukses atau error"
      );
    });
}
