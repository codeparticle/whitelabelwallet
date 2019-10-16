import types from './types';
import createAction from 'rdx/utils/create-action';

const resetFields = () => createAction(types.RESET_FIELDS);
const setAmount = payload => createAction(types.SET_AMOUNT, payload);
const setFromAddress = payload => createAction(types.SET_FROM_ADDRESS, payload);
const setMemo = payload => createAction(types.SET_MEMO, payload);
const setToAddress = payload => createAction(types.SET_TO_ADDRESS, payload);

export {
  resetFields,
  setAmount,
  setFromAddress,
  setMemo,
  setToAddress,
};
