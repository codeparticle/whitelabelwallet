import { svgs } from '@codeparticle/whitelabelwallet.styleguide';

import pluginId from './plugin-id';
import { MyWalletsPage } from './pages';
import { newWalletReducer } from './rdx/reducers';
import { addLocales } from './translations/add-locales';
import { MY_WALLETS } from './translations/keys';

export const MyWalletsPlugin = (store) => {
  store.dispatch(addLocales());
  store.injectPluginReducer('newWallet', newWalletReducer);

  return [
    {
      role: 'main-route',
      components: [
        {
          path: `/${pluginId}`,
          component: MyWalletsPage,
          exact: true,
        },
      ],
    },
    {
      role: 'main-route-link',
      components: [
        {
          label: MY_WALLETS.NAV_ITEM,
          Icon: svgs.icons.SvgWallet,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
