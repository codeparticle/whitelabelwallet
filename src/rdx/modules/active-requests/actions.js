import types from 'rdx/modules/active-requests/types';
import createAction from 'rdx/utils/create-action';

export default {
  addActiveRequest: payload => createAction(types.ADD_ACTIVE_REQUEST, payload),
  removeActiveRequest: payload => createAction(types.REMOVE_ACTIVE_REQUEST, payload),
};
