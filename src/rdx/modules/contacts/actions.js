import types from './types';
import createAction from 'rdx/utils/create-action';

export default {
  setContacts: payload => createAction(types.SET_CONTACTS, payload),
};
