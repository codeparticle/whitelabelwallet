import types from './types';
import createAction from 'rdx/utils/create-action';

const clearWalletData = () => createAction(types.CLEAR);
const setSelectedWallet = payload => createAction(types.SET_SELECTED_WALLET, payload);
const setSelectedAddress = payload => createAction(types.SET_SELECTED_ADDRESS, payload);
const setSelectedWalletAddresses = payload => createAction(types.SET_SELECTED_WALLET_ADDRESSES, payload);
const setSelectedWalletTransactions = payload => createAction(types.SET_SELECTED_WALLET_TRANSACTIONS, payload);
const setSelectedWalletTransactionsSearchResults = payload => createAction(types.SET_SELECTED_TRANSACTIONS_SEARCH_RESULTS, payload);
const clearSelectedWalletTransactions = () => createAction(types.CLEAR_SELECTED_WALLET_TRANSACTIONS);
const setWallets = payload => createAction(types.SET_WALLETS, payload);

export {
  clearWalletData,
  clearSelectedWalletTransactions,
  setSelectedWallet,
  setSelectedAddress,
  setSelectedWalletAddresses,
  setSelectedWalletTransactions,
  setSelectedWalletTransactionsSearchResults,
  setWallets,
};