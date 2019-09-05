import { combineReducers } from 'redux';
import activeRequestsReducers from 'rdx/modules/active-requests/reducers';
import apiReducers from 'rdx/modules/api/reducers';
import appReducers from 'rdx/modules/app/reducers';
import authReducers from 'rdx/modules/auth/reducers';
import localeReducers from 'rdx/modules/locale/reducers';
import messageReducers from 'rdx/modules/messages/reducers';
import navBarReducers from 'rdx/modules/nav-bar/reducers';
import pluginsReducers from 'rdx/modules/plugins/reducers';
import routerReducers from 'rdx/modules/router/reducers';
import selectedReducers from 'rdx/modules/selected/reducers';
import settingsReducers from 'rdx/modules/settings/reducers';
import transactionsReducers from 'rdx/modules/transactions/reducers';
import { connectRouter } from 'connected-react-router';
// IMPORT_PT (for script -- do not remove!)

export const reducers = {
  ...activeRequestsReducers,
  ...apiReducers,
  ...appReducers,
  ...authReducers,
  ...localeReducers,
  ...messageReducers,
  ...navBarReducers,
  ...pluginsReducers,
  ...routerReducers,
  ...selectedReducers,
  ...settingsReducers,
  ...transactionsReducers,
// INSERTION_PT (for script -- do not remove!)
};

export default function compileReducers(history, pluginsReducers) {
  return combineReducers({
    ...pluginsReducers,
    ...reducers,
    router: connectRouter(history),
  });
}
