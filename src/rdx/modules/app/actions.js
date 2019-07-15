import types from 'rdx/modules/app/types';
import createAction from 'rdx/utils/create-action';

export default {
  batchActions: actions => createAction(types.BATCH_ACTIONS, actions),
};
