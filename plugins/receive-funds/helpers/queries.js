/**
 * @fileoverview Queries related to the receive funds plugin
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

/**
 * Returns an array of wallet objects based on the queried value
 * @returns {Array}
 * @param {string} value
 */
async function getWalletAddressesByValue(value) {
  return await manager.databaseManager.getWalletAddressesByValue(value);
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
  getFormattedAddressName,
  getWalletAddresses,
  getWalletAddressesByValue,
};
