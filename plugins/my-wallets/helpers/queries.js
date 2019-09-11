/**
 * @fileoverview DB related functions used in the My-Wallets Plugin
 * @author Marc Mathieu
 */


/**
   * Function that gets all Wallets from DB, and then sets the response
   * to the redux store
   * @param {Object} manager - the manager object
   * @param {func} setFn - function that sets the response to state
   */
async function fetchWallets(manager, setFn) {
  const res = await manager.databaseManager.getWallets();
  setFn(res);
}

/**
 * Function to get a single wallet from db by ID
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the res to state
 * @param {number} id - id of wallet to get
 */
async function getWalletById(manager, setFn, id) {
  const res = await manager.databaseManager.getWalletById(id);
  setFn(res);
}

/**
 * Function that adds a new wallet to the db, and then sets the updated wallet table to state
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the response to state
 * @param {Object} wallet - the wallet object to add to the db
 */
async function createWalletAndUpdateList(manager, setFn, wallet) {
  await manager.databaseManager.insert().wallet(wallet);
  await manager.saveDatabase();

  await fetchWallets(manager, setFn);
}

/**
 * Function that updates a wallet by id, and then updates the selected
 * wallet in state.
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the response to state
 * @param {Object} wallet - the wallet object to add to the db
 */
async function updateWalletAndUpdateState(manager, setFn, wallet) {
  await manager.databaseManager.updateWalletById(wallet.id, wallet);
  await manager.saveDatabase();

  await getWalletById(manager, setFn, wallet.id);
}


export {
  createWalletAndUpdateList,
  fetchWallets,
  getWalletById,
  updateWalletAndUpdateState,
};
