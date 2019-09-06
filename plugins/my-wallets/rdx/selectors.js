import { get } from 'lodash';

const getWallets = state => get(state, 'wallets', []);

export {
  getWallets,
};