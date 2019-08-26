import types from './types';
import createAction from 'rdx/utils/create-action';

const setContacts = payload => createAction(types.SET_CONTACTS, payload);

export {
  setContacts,
};
