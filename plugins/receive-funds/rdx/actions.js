import types from './types';
import createAction from 'rdx/utils/create-action';

const preSelectReceiver = (payload = null) => createAction(types.PRE_SELECT_RECEIVER, payload);
const setAddress = payload => createAction(types.SET_ADDRESS, payload);
const setAmount = payload => createAction(types.SET_AMOUNT, payload);

export {
  preSelectReceiver,
  setAddress,
  setAmount,
};
