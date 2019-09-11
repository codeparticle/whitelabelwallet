import { svgs } from '@codeparticle/whitelabelwallet.styleguide';

import pluginId from './plugin-id';
import { MyWalletsPage, WalletOverviewPage } from './pages';
import { walletsReducer } from './rdx/reducers';
import { addLocales } from './translations/add-locales';
import { MY_WALLETS } from './translations/keys';

export const MyWalletsPlugin = (store) => {
  store.dispatch(addLocales());
  store.injectPluginReducer('wallets', walletsReducer);

  return [
    {
      role: 'main-route',
      components: [
        {
          path: `/${pluginId}`,
          component: MyWalletsPage,
          exact: true,
        },
        {
          path: `/${pluginId}/:walletId/overview`,
          component: WalletOverviewPage,
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
