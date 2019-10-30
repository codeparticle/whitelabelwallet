/**
 * @fileoverview DB related functions used in the My-Wallets Plugin
 * @author Marc Mathieu
 */
import { manager } from 'app';

/**
 * Function that gets all Transactions from DB, and then sets the response
 * to the redux store
 * @param {func} setFn - function that sets the response to state
 */
async function fetchTransactions(setFn, filterDate = null) {
  const res = await manager.databaseManager.getTransactionsAfterDate(filterDate);
  setFn(res);
}

/**
 * Function that gets all Addresses from DB, and then sets the response
 * to the redux store
 * @param {func} setFn - function that sets the response to state
 */
async function fetchAddresses(setFn) {
  const res = await manager.databaseManager.getAddresses();
  setFn(res);
}

/**
 * Function to get a single wallet from db by Address
 * @param {string} address - address of wallet to get
 * @param {func} setFn - function that sets the res to state
 */
async function getWalletByAddress(address) {
  const res = await manager.databaseManager.getWalletAddressesByValue(address);
  return res;
}

/**
 * Function to search a transactions
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} value - the value to query
 */
async function searchTransactionsAndWalletsByValue(setFn, value, addresses, filterDate = null) {
  const res = await manager.databaseManager.searchTransactionsAndWalletsByValue(addresses, value, filterDate);
  setFn(res);
}

export {
  fetchAddresses,
  fetchTransactions,
  getWalletByAddress,
  searchTransactionsAndWalletsByValue,
};
