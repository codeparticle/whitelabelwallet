import types from './types';
import createAction from 'rdx/utils/create-action';

export default {
  setSelectedAddress: payload => createAction(types.SET_ADDRESS, payload),
  setSelectedContact: payload => createAction(types.SET_CONTACT, payload),
  setSelectedWallet: payload => createAction(types.SET_WALLET, payload),
};
