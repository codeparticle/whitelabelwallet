/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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