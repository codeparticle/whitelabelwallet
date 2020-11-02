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
