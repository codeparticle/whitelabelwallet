import { svgs } from '@codeparticle/whitelabelwallet.styleguide';

import pluginId from './plugin-id';
import { ReceiveFundsPage } from './pages';
import { addLocales } from './translations/add-locales';
import { RECEIVE_FUNDS } from './translations/keys';

export const ReceiveFundsPlugin = (store) => {
  store.dispatch(addLocales());

  return [
    {
      role: 'main-route',
      components: [
        {
          path: `/${pluginId}`,
          component: ReceiveFundsPage,
          exact: true,
        },
      ],
    },
    {
      role: 'main-route',
      components: [
        {
          path: `/${pluginId}/secondary-page`,
          component: ReceiveFundsPage,
          exact: true,
        },
      ],
    },
    {
      role: 'main-route-link',
      components: [
        {
          label: RECEIVE_FUNDS.NAV_ITEM,
          Icon: svgs.icons.SvgReceive,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
