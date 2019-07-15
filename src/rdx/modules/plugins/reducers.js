import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/plugins/types';

export default {
  plugins: createReducer({}, {
    [types.REGISTER](state, action) {
      const pluginsByRoles = { ...state };

      if (!Array.isArray(action.payload)) {
        return state;
      }

      action.payload.forEach((plugin) => {
        const { role } = plugin;

        if (role) {
          if (!pluginsByRoles[role]) {
            pluginsByRoles[role] = [];
          }

          pluginsByRoles[role].push(plugin);
        }
      });

      return pluginsByRoles;
    },
  }),
};
