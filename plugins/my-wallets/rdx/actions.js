import types from './types';
import createAction from 'rdx/utils/create-action';

const clearWalletData = () => createAction(types.CLEAR);
const setWallets = payload => createAction(types.SET_WALLETS, payload);

export {
  clearWalletData,
  setWallets,
};