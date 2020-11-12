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
 * @fileoverview Queries related to sending funds between addresses
 * @author Gabriel Womble
 */
import { manager } from 'app';

/**
 * Function that returns an array of wallet objects with an addresses property
 * @returns {Array} wallet objects with addresses stored as a property
 */
async function getWalletAddresses() {
  return await manager.databaseManager.getWalletAddresses();
}

async function getWalletAddressesByValue(value) {
  return await manager.databaseManager.getWalletAddressesByValue(value);
}

/**
 * @returns {number} - balance
 * @param {string} address - address to query
 */
async function getBalanceByAddress(address) {
  return await manager.databaseManager.getBalanceByAddress(address);
}

/**
 * Function that returns an array of contacts from db
 * @returns {Array} contacts from db
 */
async function getContacts() {
  return await manager.databaseManager.getContacts();
}

async function createTransaction({ fromAddress, toAddress, amount, memo, fee }) {
  return manager.transactionManager.createTransaction({ fromAddress, toAddress, amount, memo, fee });
}

/**
 * Function to search a contact by name or address
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} value - the value to query
 */
async function getContactsByValue(setFn, value) {
  const res = await manager.databaseManager.getContactsByValue(value);
  setFn(res);
}

/**
 * Function that retrieves formatted contact name from DB
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} address - the address to query
 */
async function getFormattedContactName(setFn, address) {
  const res = await manager.databaseManager.getFormattedContactName(address);
  setFn(res);
}

/**
 * Function that gets a wallets name by address and sets it to state
 * @returns {string} - wallet name
 * @param {Function} setFn - the funtion that sets the query response to state
 * @param {string} address - the address to query
 */
async function getWalletNameByAddress(setFn, address) {
  const res = await manager.databaseManager.getWalletNameByAddress(address);
  setFn(res);
}

/**
 * Function that retrieves formatted address name from DB
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} address - the address to query
 */
async function getFormattedAddressName(setFn, address) {
  if (address) {
    const { walletName, addressName } = await manager.databaseManager.getAddressName(address);
    const formattedName = addressName ? `${walletName} - ${addressName}` : walletName;
    setFn(formattedName);
  }
}

export {
  createTransaction,
  getBalanceByAddress,
  getContacts,
  getContactsByValue,
  getFormattedAddressName,
  getFormattedContactName,
  getWalletAddresses,
  getWalletAddressesByValue,
  getWalletNameByAddress,
};
