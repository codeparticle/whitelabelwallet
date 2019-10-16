import { get } from 'lodash';

const getAmount = state => get(state, 'sendFunds.amount', '');
const getFromAddress = state => get(state, 'sendFunds.fromAddress', '');
const getMemo = state => get(state, 'sendFunds.memo', '');
const getToAddress = state => get(state, 'sendFunds.toAddress', '');

export {
  getAmount,
  getFromAddress,
  getMemo,
  getToAddress,
};
