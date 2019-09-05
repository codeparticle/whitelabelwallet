import activeRequestsSelectors from 'rdx/modules/active-requests/selectors';
import apiSelectors from 'rdx/modules/api/selectors';
import appSelectors from 'rdx/modules/app/selectors';
import localeSelectors from 'rdx/modules/locale/selectors';
import routerSelectors from 'rdx/modules/router/selectors';
import authSelectors from 'rdx/modules/auth/selectors';
import messageSelectors from 'rdx/modules/messages/selectors';
import navBarSelectors from 'rdx/modules/nav-bar/selectors';
import pluginsSelectors from 'rdx/modules/plugins/selectors';
import selectedSelectors from 'rdx/modules/selected/selectors';
import settingsSelectors from 'rdx/modules/settings/selectors';
import transactionsSelectors from 'rdx/modules/transactions/selectors';
// IMPORT_PT (for script -- do not remove!)

const selectors = {
  ...activeRequestsSelectors,
  ...apiSelectors,
  ...appSelectors,
  ...localeSelectors,
  ...routerSelectors,
  ...authSelectors,
  ...messageSelectors,
  ...navBarSelectors,
  ...pluginsSelectors,
  ...selectedSelectors,
  ...settingsSelectors,
  ...transactionsSelectors,
// INSERTION_PT (for script -- do not remove!)
};

export default selectors;
