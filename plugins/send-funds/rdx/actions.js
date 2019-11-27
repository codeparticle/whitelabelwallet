import types from './types';
import createAction from 'rdx/utils/create-action';

const resetFields = () => createAction(types.RESET_FIELDS);
const preSelectFromAddress = (payload = null) => createAction(types.PRE_SELECT_FROM_ADDRESS, payload);
const preSelectToAddress = (payload = null) => createAction(types.PRE_SELECT_TO_ADDRESS, payload);
const setAmount = payload => createAction(types.SET_AMOUNT, payload);
const setFee = payload => createAction(types.SET_FEE, payload);
const setFromAddress = payload => createAction(types.SET_FROM_ADDRESS, payload);
const setMemo = payload => createAction(types.SET_MEMO, payload);
const setToAddress = payload => createAction(types.SET_TO_ADDRESS, payload);

export {
  resetFields,
  preSelectFromAddress,
  preSelectToAddress,
  setAmount,
  setFee,
  setFromAddress,
  setMemo,
  setToAddress,
};
