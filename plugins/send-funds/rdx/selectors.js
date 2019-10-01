import { get } from 'lodash';

const getToAddress = state => get(state, 'sendFunds.toAddress', {});
const getFromAddress = state => get(state, 'sendFunds.fromAddress', {});

export {
  getToAddress,
  getFromAddress,
};
