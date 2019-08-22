import { svgs } from '@codeparticle/whitelabelwallet.styleguide';

import pluginId from './plugin-id';
import { ContactsPage } from './pages';
import { addLocales } from './translations/add-locales';
import { CONTACTS } from './translations/keys';

export const ContactsPlugin = (store) => {
  store.dispatch(addLocales());

  return [
    {
      role: 'main-route',
      components: [
        {
          path: `/${pluginId}`,
          component: ContactsPage,
          exact: true,
        },
      ],
    },
    {
      role: 'main-route-link',
      components: [
        {
          label: CONTACTS.NAV_ITEM,
          Icon: svgs.icons.SvgContact,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
