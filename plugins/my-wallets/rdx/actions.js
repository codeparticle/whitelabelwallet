import types from './types';
import createAction from 'rdx/utils/create-action';

const clearWalletData = () => createAction(types.CLEAR);
const createNewWallet = payload => createAction(types.NEW_WALLET, payload);

export {
  clearWalletData,
  createNewWallet,
};