import { QRPay } from './qr-pay.js';

const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnScan = document.querySelector(".controls_button--scan");
const qrScan = document.querySelector("#popup");
const btnClose = document.querySelector(".close");



var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250});
html5QrcodeScanner.render(onScanSuccess);

function onScanSuccess(decodedText, decodedResult) {
    inputArea.value = decodedText;
    const qrPay = new QRPay(inputArea.value);
    const formatted = JSON.stringify(qrPay, null, 4)
    outputArea.value = formatted;
    qrScan.classList.toggle("active");
}


inputArea.addEventListener("input", () => {
    const qrPay = new QRPay(inputArea.value);
    const formatted = JSON.stringify(qrPay, null, 4)
    outputArea.value = formatted;
})

btnScan.addEventListener("click", () => {
    qrScan.classList.toggle("active");
})

btnClose.addEventListener("click", () =>  {
    qrScan.classList.toggle("active");
})