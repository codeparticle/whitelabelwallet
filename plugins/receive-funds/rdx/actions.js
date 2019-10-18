import types from './types';
import createAction from 'rdx/utils/create-action';

const setAddress = payload => createAction(types.SET_ADDRESS, payload);
const setAmount = payload => createAction(types.SET_AMOUNT, payload);

export {
  setAddress,
  setAmount,
};
