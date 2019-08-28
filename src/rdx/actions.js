import activeRequestsActions from 'rdx/modules/active-requests/actions';
import apiActions from 'rdx/modules/api/actions';
import appActions from 'rdx/modules/app/actions';
import authActions from 'rdx/modules/auth/actions';
import messageActions from 'rdx/modules/messages/actions';
import navBarActions from 'rdx/modules/nav-bar/actions';
import pluginsActions from 'rdx/modules/plugins/actions';
import routerActions from 'rdx/modules/router/actions';
import selectedActions from 'rdx/modules/selected/actions';
import transactionsActions from 'rdx/modules/transactions/actions';
import walletsActions from 'rdx/modules/wallets/actions';
// IMPORT_PT (for script -- do not remove!)

const actions = {
  ...activeRequestsActions,
  ...apiActions,
  ...appActions,
  ...authActions,
  ...messageActions,
  ...navBarActions,
  ...pluginsActions,
  ...routerActions,
  ...selectedActions,
  ...transactionsActions,
  ...walletsActions,
// INSERTION_PT (for script -- do not remove!)
};

export default actions;
