/**
 * @fileoverview DB related functions used in the My-Wallets Plugin
 * @author Marc Mathieu
 */
import { manager } from 'app';

/**
 * Function that gets all Wallets from DB, and then sets the response
 * to the redux store
 * @param {func} setFn - function that sets the response to state
 */
async function fetchWallets(setFn) {
  const res = await manager.databaseManager.getWallets();
  setFn(res);
}

/**
 * Function to get a single wallet from db by ID
 * @param {number} id - id of wallet to get
 * @param {func} setFn - function that sets the res to state
 */
async function getWalletById(id, setFn) {
  const res = await manager.databaseManager.getWalletById(id);
  setFn(res);
}

/**
 * Function to get a addresses from db by wallet ID
 * @param {func} setFn - function that sets the res to state
 * @param {number} id - id of wallet to get
 */
async function getAddressesByWalletId(setFn, id) {
  const res = await manager.databaseManager.getAddressesByWalletId(id);
  if (setFn !== null) {
    setFn(res);
  }
  return res;
}

/**
 * Function that adds a new wallet to the db, and then sets the updated wallet table to state
 * @param {Object} wallet - the wallet object to add to the db
 * @param {func} setFn - function that sets the response to state
 */
async function createWalletAndUpdateList(wallet, setFn) {
  await manager.walletManager.createWallet(wallet);
  await fetchWallets(setFn);
}

/**
 * Function that updates a wallet by id, and then updates the selected
 * wallet in state.
 * @param {Object} wallet - the wallet object to add to the db
 * @param {func} setFn - function that sets the response to state
 */
async function updateWalletAndUpdateState(wallet, setFn) {
  await manager.databaseManager.updateWalletById(wallet.id, wallet);
  await manager.saveDatabase();
  await getWalletById(wallet.id, setFn);
}

/**
 * Function to search a transaction by description
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} value - the value to query
 */
async function searchTransactionsByValue(setFn, value, addresses, filterDate = null) {
  const res = await manager.databaseManager.searchTransactionsForValue(addresses, value, filterDate);
  setFn(res);
}

/**
 * Function to get transactions that contain the desired address
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} address - the address value to query
 * @param {object} filterDate - date to filter transaction data
 */
async function getTransactionsPerAddress(setFn, address, filterDate) {
  const res = await manager.databaseManager.getTransactionsPerAddressAfterDate(address, filterDate);
  if (setFn !== null) {
    setFn(res);
  }
  return res;
}
/**
 * Function to get transactions to display on wallet chart
 * @param {string} address - the address value to query
 * @param {object} filterDate - date to filter transaction data
 */
async function getTransactionsForChart(address, filterDate) {
  const res = await manager.databaseManager.getTransactionsPerAddressAfterDate(address, filterDate);
  return res;
}


export {
  createWalletAndUpdateList,
  fetchWallets,
  getAddressesByWalletId,
  getWalletById,
  getTransactionsPerAddress,
  getTransactionsForChart,
  searchTransactionsByValue,
  updateWalletAndUpdateState,
};
