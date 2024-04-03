import {
    FieldID,
    QRProvider,
    VietQRConsumerFieldID,
    Beneficiary,
    AdditionalDataID,
    MerchantInfo,
    AdditionalData,
    QRProviderGUID,
    ProviderFieldID,
    Merchant
  } from "./constants/qr-pay.js"
  import { crc16ccitt } from "./crc16.js"
  export class QRPay {
    isValid = true
  
    constructor(content) {
      this.merchantInfo = new MerchantInfo()
      this.beneficiary = new Beneficiary()
      this.merchant = new Merchant()
      this.additionalData = new AdditionalData()
      this.parse(content ?? "")
    }
  
    parse(content) {
      if (content.length < 4) return this.invalid()
      // verify CRC
      const crcValid = QRPay.verifyCRC(content)
      if (!crcValid) return this.invalid()
      // parse content
      this.parseRootContent(content)
    }
  
    parseRootContent(content) {
      const { id, length, value, nextValue } = QRPay.sliceContent(content)
      if (value.length !== length) return this.invalid()
      switch (id) {
        case FieldID.VERSION:
          this.version = value
          break
        case FieldID.INIT_METHOD:
          this.initMethod = value
          break
        case FieldID.VIETQR:
        case FieldID.VNPAYQR:
          this.merchantInfo.fieldId = id
          this.parseProviderInfo(value)
          break
        case FieldID.CATEGORY:
          this.category = value
          break
        case FieldID.CURRENCY:
          this.currency = value
          break
        case FieldID.AMOUNT:
          this.amount = value
          break
        case FieldID.TIP_AND_FEE_TYPE:
          this.tipAndFeeType = value
          break
        case FieldID.TIP_AND_FEE_AMOUNT:
          this.tipAndFeeAmount = value
          break
        case FieldID.TIP_AND_FEE_PERCENT:
          this.tipAndFeePercent = value
          break
        case FieldID.NATION:
          this.nation = value
          break
        case FieldID.MERCHANT_NAME:
          this.merchant.name = value
          break
        case FieldID.CITY:
          this.city = value
          break
        case FieldID.ZIP_CODE:
          this.zipCode = value
          break
        case FieldID.ADDITIONAL_DATA:
          this.parseAdditionalData(value)
          break
        case FieldID.CRC:
          this.crc = value
          break
        default:
          break
      }
      if (nextValue.length > 4) this.parseRootContent(nextValue)
    }
  
    parseProviderInfo(content) {
      const { id, value, nextValue } = QRPay.sliceContent(content)
      switch (id) {
        case ProviderFieldID.GUID:
          this.merchantInfo.guid = value
          break
        case ProviderFieldID.DATA:
          if (this.merchantInfo.guid === QRProviderGUID.VNPAY) {
            this.merchantInfo.name = QRProvider.VNPAY
            this.merchant.id = value
          } else if (this.merchantInfo.guid === QRProviderGUID.VIETQR) {
            this.merchantInfo.name = QRProvider.VIETQR
            this.parseVietQRConsumer(value)
          }
          break
        case ProviderFieldID.SERVICE:
          this.merchantInfo.service = value
          break
        default:
          break
      }
      if (nextValue.length > 4) this.parseProviderInfo(nextValue)
    }
  
    parseVietQRConsumer(content) {
      const { id, value, nextValue } = QRPay.sliceContent(content)
      switch (id) {
        case VietQRConsumerFieldID.BANK_BIN:
          this.beneficiary.bankBin = value
          break
        case VietQRConsumerFieldID.BANK_NUMBER:
          this.beneficiary.bankNumber = value
          break
        default:
          break
      }
      if (nextValue.length > 4) this.parseVietQRConsumer(nextValue)
    }
  
    parseAdditionalData(content) {
      const { id, value, nextValue } = QRPay.sliceContent(content)
      switch (id) {
        case AdditionalDataID.PURPOSE_OF_TRANSACTION:
          this.additionalData.purpose = value
          break
        case AdditionalDataID.BILL_NUMBER:
          this.additionalData.billNumber = value
          break
        case AdditionalDataID.MOBILE_NUMBER:
          this.additionalData.mobileNumber = value
          break
        case AdditionalDataID.REFERENCE_LABEL:
          this.additionalData.reference = value
          break
        case AdditionalDataID.STORE_LABEL:
          this.additionalData.store = value
          break
        case AdditionalDataID.TERMINAL_LABEL:
          this.additionalData.terminal = value
          break
        default:
          break
      }
      if (nextValue.length > 4) this.parseAdditionalData(nextValue)
    }
  
    static verifyCRC(content) {
      const checkContent = content.slice(0, -4)
      const crcCode = content.slice(-4).toUpperCase()
  
      const genCrcCode = QRPay.genCRCCode(checkContent)
      return crcCode === genCrcCode
    }
  
    static genCRCCode(content) {
      const crcCode = crc16ccitt(content)
        .toString(16)
        .toUpperCase()
      return `0000${crcCode}`.slice(-4)
    }
  
    static sliceContent(content) {
      const id = content.slice(0, 2)
      const length = Number(content.slice(2, 4))
      const value = content.slice(4, 4 + length)
      const nextValue = content.slice(4 + length)
      return { id, length, value, nextValue }
    }
  
    invalid() {
      this.isValid = false
    }
  
    static genFieldData(id, value) {
      const fieldId = id ?? ""
      const fieldValue = value ?? ""
      const idLen = fieldId.length
      if (idLen !== 2 || fieldValue.length <= 0) return ""
      const length = `00${fieldValue.length}`.slice(-2)
      return `${fieldId}${length}${fieldValue}`
    }
  }
  