import { get } from 'lodash';

export default {
  getContacts: state => get(state, 'contacts', []),
};
