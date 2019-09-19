import { get } from 'lodash';

const getSelectedWallet = state => get(state, 'wallets.selected', {});
const getSelectedWalletAddresses = state => get(state, 'wallets.addresses', []);
const getSelectedWalletTransactions = state => get(state, 'wallets.transactions', []);
const getWallets = state => get(state, 'wallets.wallets', []);

export {
  getSelectedWallet,
  getSelectedWalletAddresses,
  getSelectedWalletTransactions,
  getWallets,
};