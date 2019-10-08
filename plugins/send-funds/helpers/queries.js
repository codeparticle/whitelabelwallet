/**
 * @fileoverview Queries related to sending funds between addresses
 * @author Gabriel Womble
 */
import { manager } from 'app';
import { TransactionManager } from 'api';

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
 * Function that returns an array of contacts from db
 * @returns {Array} contacts from db
 */
async function getContacts() {
  return await manager.databaseManager.getContacts();
}

async function createTransaction({ fromAddress, toAddress, amount, memo }) {
  return TransactionManager.createTransaction({ fromAddress, toAddress, amount, memo });
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
 * Function that retrieves formatted address name from DB
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} address - the address to query
 */
async function getFormattedAddressName(setFn, address) {
  if (address) {
    const res = await manager.databaseManager.getFormattedAddressName(address);
    setFn(res);
  }
}

export {
  createTransaction,
  getContacts,
  getContactsByValue,
  getFormattedAddressName,
  getWalletAddresses,
  getWalletAddressesByValue,
};
