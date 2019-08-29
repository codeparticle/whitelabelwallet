import types from './types';
import createAction from 'rdx/utils/create-action';

const createNewWallet = payload => createAction(types.NEW_WALLET, payload);

export {
  createNewWallet,
};