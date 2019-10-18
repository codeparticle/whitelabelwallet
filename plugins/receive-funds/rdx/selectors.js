import { get } from 'lodash';

const getAddress = state => get(state, 'receiveFunds.address', '');
const getAmount = state => get(state, 'receiveFunds.amount', '');

export {
  getAddress,
  getAmount,
};
