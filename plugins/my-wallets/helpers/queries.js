/**
 * @fileoverview DB related functions used in the My-Wallets Plugin
 * @author Marc Mathieu
 */
import { WalletManager } from 'api';

/**
 * Function that gets all Wallets from DB, and then sets the response
 * to the redux store
 * @param {func} setFn - function that sets the response to state
 */
async function fetchWallets(setFn) {
  const res = await WalletManager.fetchWallets();
  setFn(res);
}

/**
 * Function to get a single wallet from db by ID
 * @param {number} id - id of wallet to get
 * @param {func} setFn - function that sets the res to state
 */
async function getWalletById(id, setFn) {
  const res = await WalletManager.getWalletById(id);
  setFn(res);
}

/**
 * Function that adds a new wallet to the db, and then sets the updated wallet table to state
 * @param {Object} wallet - the wallet object to add to the db
 * @param {func} setFn - function that sets the response to state
 */
async function createWalletAndUpdateList(wallet, setFn) {
  await WalletManager.createWallet(wallet);
  await fetchWallets(setFn);
}

/**
 * Function that updates a wallet by id, and then updates the selected
 * wallet in state.
 * @param {Object} wallet - the wallet object to add to the db
 * @param {func} setFn - function that sets the response to state
 */
async function updateWalletAndUpdateState(wallet, setFn) {
  await WalletManager.updateWalletbyId(wallet);
  await getWalletById(wallet.id, setFn);
}

export {
  createWalletAndUpdateList,
  fetchWallets,
  getWalletById,
  updateWalletAndUpdateState,
};
