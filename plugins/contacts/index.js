import { svgs } from '@codeparticle/whitelabelwallet.styleguide';

import pluginId from './plugin-id';
import { ContactsPage } from './pages';
import { contactsReducer } from './rdx/reducers';
import { addLocales } from './translations/add-locales';
import { CONTACTS } from './translations/keys';

export const ContactsPlugin = (store) => {
  store.dispatch(addLocales());
  store.injectPluginReducer('contacts', contactsReducer);

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
          label: CONTACTS.TITLE,
          Icon: svgs.icons.SvgContact,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
