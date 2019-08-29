import types from './types';
import createAction from 'rdx/utils/create-action';

const clearData = () => createAction(types.CLEAR);
const createNewWallet = payload => createAction(types.NEW_WALLET, payload);

export {
  clearData,
  createNewWallet,
};