import types from 'rdx/modules/plugins/types';
import createAction from 'rdx/utils/create-action';

export default {
  registerPlugin: payload => createAction(types.REGISTER, payload),
};
