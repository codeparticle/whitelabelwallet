import activeRequestsSelectors from 'rdx/modules/active-requests/selectors';
import apiSelectors from 'rdx/modules/api/selectors';
import appSelectors from 'rdx/modules/app/selectors';
import localeSelectors from 'rdx/modules/locale/selectors';
import routerSelectors from 'rdx/modules/router/selectors';
import authSelectors from 'rdx/modules/auth/selectors';
import messageSelectors from 'rdx/modules/messages/selectors';
import pluginsSelectors from 'rdx/modules/plugins/selectors';
// IMPORT_PT (for script -- do not remove!)

const selectors = {
  ...activeRequestsSelectors,
  ...apiSelectors,
  ...appSelectors,
  ...localeSelectors,
  ...routerSelectors,
  ...authSelectors,
  ...messageSelectors,
  ...pluginsSelectors,
// INSERTION_PT (for script -- do not remove!)
};

export default selectors;
