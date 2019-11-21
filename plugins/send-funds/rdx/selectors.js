import { get } from 'lodash';

const getAmount = state => get(state, 'sendFunds.amount', '');
const getFiat = state => get(state, 'settings.fiat');
const getFromAddress = state => get(state, 'sendFunds.fromAddress', '');
const getMemo = state => get(state, 'sendFunds.memo', '');
const getToAddress = state => get(state, 'sendFunds.toAddress', '');

export {
  getAmount,
  getFiat,
  getFromAddress,
  getMemo,
  getToAddress,
};
