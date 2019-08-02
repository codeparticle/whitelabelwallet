import activeRequestsSelectors from 'rdx/modules/active-requests/selectors';
import apiSelectors from 'rdx/modules/api/selectors';
import appSelectors from 'rdx/modules/app/selectors';
import localeSelectors from 'rdx/modules/locale/selectors';
import routerSelectors from 'rdx/modules/router/selectors';
import authSelectors from 'rdx/modules/auth/selectors';
import contactsSelectors from 'rdx/modules/contacts/selectors';
import messageSelectors from 'rdx/modules/messages/selectors';
import pluginsSelectors from 'rdx/modules/plugins/selectors';
import selectedSelectors from 'rdx/modules/selected/selectors';
import transactionsSelectors from 'rdx/modules/transactions/selectors';
import walletsSelectors from 'rdx/modules/wallets/selectors';
// IMPORT_PT (for script -- do not remove!)

const selectors = {
  ...activeRequestsSelectors,
  ...apiSelectors,
  ...appSelectors,
  ...contactsSelectors,
  ...localeSelectors,
  ...routerSelectors,
  ...authSelectors,
  ...messageSelectors,
  ...pluginsSelectors,
  ...selectedSelectors,
  ...transactionsSelectors,
  ...walletsSelectors,
// INSERTION_PT (for script -- do not remove!)
};

export default selectors;
