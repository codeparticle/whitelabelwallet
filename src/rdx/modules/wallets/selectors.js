import { get } from 'lodash';

export default {
  getWallets: state => get(state, 'wallets', {}),
};
