import { get } from 'lodash';

const getSelectedWallet = state => get(state, 'wallets.selected', {});
const getWallets = state => get(state, 'wallets.wallets', []);

export {
  getSelectedWallet,
  getWallets,
};