import { get } from 'lodash';

const getFiat = state => get(state, 'settings.fiat');
const getSelectedWallet = state => get(state, 'wallets.selected', {});
const getSelectedAddress = state => get(state, 'wallets.selectedAddress', {});
const getSelectedWalletAddresses = state => get(state, 'wallets.addresses', []);
const getSelectedWalletTransactions = state => get(state, 'wallets.transactions', []);
const getWallets = state => get(state, 'wallets.wallets', []);

export {
  getFiat,
  getSelectedAddress,
  getSelectedWallet,
  getSelectedWalletAddresses,
  getSelectedWalletTransactions,
  getWallets,
};