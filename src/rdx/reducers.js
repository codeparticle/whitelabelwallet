import { combineReducers } from 'redux';
import activeRequestsReducers from 'rdx/modules/active-requests/reducers';
import apiReducers from 'rdx/modules/api/reducers';
import appReducers from 'rdx/modules/app/reducers';
import routerReducers from 'rdx/modules/router/reducers';
import authReducers from 'rdx/modules/auth/reducers';
import messageReducers from 'rdx/modules/messages/reducers';
import localeReducers from 'rdx/modules/locale/reducers';
import pluginsReducers from 'rdx/modules/plugins/reducers';
import { connectRouter } from 'connected-react-router';
// IMPORT_PT (for script -- do not remove!)

export const reducers = {
  ...activeRequestsReducers,
  ...apiReducers,
  ...appReducers,
  ...routerReducers,
  ...authReducers,
  ...messageReducers,
  ...localeReducers,
  ...pluginsReducers,
// INSERTION_PT (for script -- do not remove!)
};

export default function compileReducers(history, pluginsReducers) {
  return combineReducers({
    ...pluginsReducers,
    ...reducers,
    router: connectRouter(history),
  });
}
