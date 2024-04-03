export let QRProvider

;(function(QRProvider) {
  QRProvider["VIETQR"] = "VIETQR"
  QRProvider["VNPAY"] = "VNPAY"
})(QRProvider || (QRProvider = {}))

export let QRProviderGUID

;(function(QRProviderGUID) {
  QRProviderGUID["VNPAY"] = "A000000775"
  QRProviderGUID["VIETQR"] = "A000000727"
})(QRProviderGUID || (QRProviderGUID = {}))

export let FieldID

;(function(FieldID) {
  FieldID["VERSION"] = "00"
  FieldID["INIT_METHOD"] = "01"
  FieldID["VNPAYQR"] = "26"
  FieldID["VIETQR"] = "38"
  FieldID["CATEGORY"] = "52"
  FieldID["CURRENCY"] = "53"
  FieldID["AMOUNT"] = "54"
  FieldID["TIP_AND_FEE_TYPE"] = "55"
  FieldID["TIP_AND_FEE_AMOUNT"] = "56"
  FieldID["TIP_AND_FEE_PERCENT"] = "57"
  FieldID["NATION"] = "58"
  FieldID["MERCHANT_NAME"] = "59"
  FieldID["CITY"] = "60"
  FieldID["ZIP_CODE"] = "61"
  FieldID["ADDITIONAL_DATA"] = "62"
  FieldID["CRC"] = "63"
})(FieldID || (FieldID = {}))

export let ProviderFieldID

;(function(ProviderFieldID) {
  ProviderFieldID["GUID"] = "00"
  ProviderFieldID["DATA"] = "01"
  ProviderFieldID["SERVICE"] = "02"
})(ProviderFieldID || (ProviderFieldID = {}))

export let VietQRService

;(function(VietQRService) {
  VietQRService["BY_ACCOUNT_NUMBER"] = "QRIBFTTA"
  VietQRService["BY_CARD_NUMBER"] = "QRIBFTTC"
})(VietQRService || (VietQRService = {}))

export let VietQRConsumerFieldID

;(function(VietQRConsumerFieldID) {
  VietQRConsumerFieldID["BANK_BIN"] = "00"
  VietQRConsumerFieldID["BANK_NUMBER"] = "01"
})(VietQRConsumerFieldID || (VietQRConsumerFieldID = {}))

export let AdditionalDataID

;(function(AdditionalDataID) {
  AdditionalDataID["BILL_NUMBER"] = "01"
  AdditionalDataID["MOBILE_NUMBER"] = "02"
  AdditionalDataID["STORE_LABEL"] = "03"
  AdditionalDataID["LOYALTY_NUMBER"] = "04"
  AdditionalDataID["REFERENCE_LABEL"] = "05"
  AdditionalDataID["CUSTOMER_LABEL"] = "06"
  AdditionalDataID["TERMINAL_LABEL"] = "07"
  AdditionalDataID["PURPOSE_OF_TRANSACTION"] = "08"
  AdditionalDataID["ADDITIONAL_CONSUMER_DATA_REQUEST"] = "09"
})(AdditionalDataID || (AdditionalDataID = {}))

export class MerchantInfo {}

export class AdditionalData {}

export class Beneficiary {}

export class Merchant {}
