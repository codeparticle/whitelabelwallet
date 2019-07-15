import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/messages/types';
import { messageTypes } from 'rdx/modules/messages/constants';
import uuidv1 from 'uuid/v1';

export default {
  latestMessageEvent: createReducer(null, {
    [types.NEW_MESSAGE_EVENT](state, action) {
      return {
        id: uuidv1(),
        type: messageTypes.GENERAL,
        ...action.payload,
      };
    },
    [types.NEW_ERROR_EVENT](state, action) {
      return {
        id: uuidv1(),
        type: messageTypes.ERROR,
        ...action.payload,
      };
    },
  }),
};
