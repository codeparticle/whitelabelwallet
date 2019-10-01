import { svgs } from '@codeparticle/whitelabelwallet.styleguide';

import pluginId from './plugin-id';
import { SendFundsPage } from './pages';
import { sendFundsReducer } from './rdx/reducers';
import { addLocales } from './translations/add-locales';
import { SEND_FUNDS } from './translations/keys';

export const SendFundsPlugin = (store) => {
  store.dispatch(addLocales());
  store.injectPluginReducer('sendFunds', sendFundsReducer);

  return [
    {
      role: 'main-route',
      components: [
        {
          path: `/${pluginId}`,
          component: SendFundsPage,
          exact: true,
        },
      ],
    },
    {
      role: 'main-route-link',
      components: [
        {
          label: SEND_FUNDS.TITLE,
          Icon: svgs.icons.SvgSend,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
