/**
 * These our data models that will be used throughout the app.
 * Each of these classes outline the properties we expect them to contain.
 * These models should be consistent with our db schema.
 */
class Address {
  constructor(id, name, address) {
    this.id = id,
    this.name = name,
    this.address = address;
  }
}

class Transaction {
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
  Address,
  Transaction,
};