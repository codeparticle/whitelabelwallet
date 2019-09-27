import types from './types';
import createAction from 'rdx/utils/create-action';

const setToAddress = payload => createAction(types.SET_TO_ADDRESS, payload);
const setFromAddress = payload => createAction(types.SET_FROM_ADDRESS, payload);

export {
  setToAddress,
  setFromAddress,
};
