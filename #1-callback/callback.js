function callback() {
  console.log("Callback Function");
}

function running() {
  setTimeout(function () {
    callback();
  }, 2000);
  console.log("Running Function");
}

running();
