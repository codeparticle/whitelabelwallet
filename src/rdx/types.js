import activeRequestsTypes from 'rdx/modules/active-requests/types';
import appTypes from 'rdx/modules/app/types';
import routerTypes from 'rdx/modules/router/types';
import authTypes from 'rdx/modules/auth/types';
import messageTypes from 'rdx/modules/messages/types';
import pluginsTypes from 'rdx/modules/plugins/types';
// IMPORT_PT (for script -- do not remove!)

const types = {
  ...activeRequestsTypes,
  ...appTypes,
  ...routerTypes,
  ...authTypes,
  ...messageTypes,
  ...pluginsTypes,
// INSERTION_PT (for script -- do not remove!)
};

export default types;
