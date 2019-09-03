import { get } from 'lodash';

const getNewWallet = state => get(state, 'newWallet', {});

export {
  getNewWallet,
};