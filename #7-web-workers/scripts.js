const worker = new Worker("web-workers.js");

worker.addEventListener("message", function (event) {
  console.log(`Receive Data From Web Workers: ${event.data}`);
});

function buttonClick() {
  console.log("Start Log");
  //sampel pekerjaan yang sangat besar dikerjakan di satu thread disarankan dikerjakan di web workers
  worker.postMessage(2000);
  console.log("End Log");
}
