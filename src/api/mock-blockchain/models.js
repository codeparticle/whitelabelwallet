class FormattedAddress {
  constructor(id, name, address) {
    this.id = id,
    this.name = name,
    this.address = address;
  }
}

class FormattedTransaction {
  constructor(id, amount, description, rawData, fee, senderAddress, recipientAddress) {
    this.id = id,
    this.amount = amount,
    this.description = description;
    this.rawData = rawData;
    this.fee = fee;
    this.senderAddress = senderAddress;
    this.recipientAddress = recipientAddress;
  }
}

export {
  FormattedAddress,
  FormattedTransaction,
};