import { get } from 'lodash';

const getContacts = state => get(state, 'contacts', []);

export {
  getContacts,
};
