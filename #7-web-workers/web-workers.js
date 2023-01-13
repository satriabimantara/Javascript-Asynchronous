addEventListener("message", function (event) {
  const total = event.data;
  for (let index = 0; index < total; index++) {
    console.log(index);
  }
  postMessage("Done");
});
