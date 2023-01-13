// Get backend URL example BliBli API
function getProductsURL(keyword) {
  return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword) {
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

async function buttonClick() {
  // Ambil keyword di text input
  const keyword = document.getElementById("keyword").value;

  // error handler dari Async Await dengan Try Catch
  try {
    const value = await getProducts(document.getElementById("keyword").value);
    const products = value.data.products;
    clearProducts();
    products.forEach(function (product) {
      displayProduct(product);
    });
  } catch (error) {
    alert(error.message);
  } finally {
    console.log("Selesai memproses Async Await");
  }
}
