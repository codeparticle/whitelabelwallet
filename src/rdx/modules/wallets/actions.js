import types from './types';
import createAction from 'rdx/utils/create-action';

export default {
  setWallets: payload => createAction(types.SET_WALLETS, payload),
};
