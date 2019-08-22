import activeRequestsTypes from 'rdx/modules/active-requests/types';
import appTypes from 'rdx/modules/app/types';
import authTypes from 'rdx/modules/auth/types';
import contactsTypes from 'rdx/modules/contacts/types';
import messageTypes from 'rdx/modules/messages/types';
import navBarTypes from 'rdx/modules/nav-bar/types';
import pluginsTypes from 'rdx/modules/plugins/types';
import routerTypes from 'rdx/modules/router/types';
import selectedTypes from 'rdx/modules/selected/types';
import transactionsTypes from 'rdx/modules/transactions/types';
import walletsTypes from 'rdx/modules/wallets/types';
// IMPORT_PT (for script -- do not remove!)

const types = {
  ...activeRequestsTypes,
  ...appTypes,
  ...authTypes,
  ...contactsTypes,
  ...messageTypes,
  ...navBarTypes,
  ...pluginsTypes,
  ...routerTypes,
  ...selectedTypes,
  ...transactionsTypes,
  ...walletsTypes,
// INSERTION_PT (for script -- do not remove!)
};

export default types;
