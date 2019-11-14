import { get } from 'lodash';

const getAmount = state => get(state, 'sendFunds.amount', '');
const getFiat = state => get(state, 'settings.fiat');
const getFee = state => get(state, 'sendFunds.fee', '');
const getFromAddress = state => get(state, 'sendFunds.fromAddress', '');
const getMemo = state => get(state, 'sendFunds.memo', '');
const getToAddress = state => get(state, 'sendFunds.toAddress', '');
const getPreSelectedFromAddress = state => get(state, 'sendFunds.preSelectedFromAddress', null);
const getPreSelectedToAddress = state => get(state, 'sendFunds.preSelectedToAddress', null);

export {
  getAmount,
  getFiat,
  getFee,
  getFromAddress,
  getMemo,
  getToAddress,
  getPreSelectedFromAddress,
  getPreSelectedToAddress,
};
