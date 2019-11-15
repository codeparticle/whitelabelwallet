
/**
 * Function that determines if a pre-selected wallet is a multi-address
 * @returns {Boolean}
 * @param {Object} wallet - preSelectedWallet
 */
export function preSelectedIsMultiAddress(wallet) {
  return wallet && wallet.data.addresses.length > 1;
}
