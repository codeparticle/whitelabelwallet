import { get } from 'lodash';
import { initialState } from './reducers';

export default {
  getSelected: state => get(state, 'selected', initialState),
  getSelectedAddress: state => get(state, 'selected.address', initialState.address),
  getSelectedContact: state => get(state, 'selected.contact', initialState.contact),
  getSelectedWallet: state => get(state, 'selected.wallet', initialState.wallet),
};
