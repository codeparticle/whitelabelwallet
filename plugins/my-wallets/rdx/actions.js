import types from './types';
import createAction from 'rdx/utils/create-action';

const clearWalletData = () => createAction(types.CLEAR);
const setSelectedWallet = payload => createAction(types.SET_SELECTED_WALLET, payload);
const setWallets = payload => createAction(types.SET_WALLETS, payload);

export {
  clearWalletData,
  setSelectedWallet,
  setWallets,
};