import { get } from 'lodash';

export default {
  getTransactions: state => get(state, 'transactions', []),
};
