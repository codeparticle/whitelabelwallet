import { get } from 'lodash';

const getAddress = state => get(state, 'receiveFunds.address', '');
const getAmount = state => get(state, 'receiveFunds.amount', '');
const getPreSelectedReceiver = state => get(state, 'receiveFunds.preSelectedReceiver', null);

export {
  getAddress,
  getAmount,
  getPreSelectedReceiver,
};
