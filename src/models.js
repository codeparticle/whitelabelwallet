/**
 * These are data models that will be used throughout the app.
 * Each of these classes should outline the properties they are expected to contain.
 * These models should be consistent with the db schema.
 */
class Address {
  constructor(name = '', address) {
    this.name = name,
    this.address = address;
  }
}

class Transaction {
  constructor(txid, amount, description, rawData, fee, senderAddresses, recipientAddresses) {
    this.txid = txid,
    this.amount = amount,
    this.description = description;
    this.rawData = rawData;
    this.fee = fee;
    this.senderAddresses = senderAddresses;
    this.recipientAddresses = recipientAddresses;
  }
}

export {
  Address,
  Transaction,
};