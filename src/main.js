import { QRPay } from './qr-pay.js';

const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnClear = document.querySelector(".controls_button--clear");

inputArea.addEventListener("input", () => {
    const qrPay = new QRPay(inputArea.value);
    const formatted = JSON.stringify(qrPay, null, 4)
    outputArea.value = formatted;
})

btnClear.addEventListener("click", () => {
    outputArea.value = "";
    inputArea.value = "";
})