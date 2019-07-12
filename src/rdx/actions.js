import activeRequestsActions from 'rdx/modules/active-requests/actions';
import apiActions from 'rdx/modules/api/actions';
import appActions from 'rdx/modules/app/actions';
import routerActions from 'rdx/modules/router/actions';
import authActions from 'rdx/modules/auth/actions';
import messageActions from 'rdx/modules/messages/actions';
import pluginsActions from 'rdx/modules/plugins/actions';
// IMPORT_PT (for script -- do not remove!)

const actions = {
  ...activeRequestsActions,
  ...apiActions,
  ...appActions,
  ...routerActions,
  ...authActions,
  ...messageActions,
  ...pluginsActions,
// INSERTION_PT (for script -- do not remove!)
};

export default actions;
