import { svgs } from '@codeparticle/whitelabelwallet.styleguide';

import pluginId from './plugin-id';
import { TransactionHistoryPage } from './pages';
import { addLocales } from './translations/add-locales';
import { TRANSACTION_HISTORY } from './translations/keys';
console.log(svgs.icons);
export const TransactionHistoryPlugin = (store) => {
  store.dispatch(addLocales());

  return [
    {
      role: 'main-route',
      components: [
        {
          path: `/${pluginId}`,
          component: TransactionHistoryPage,
          exact: true,
        },
      ],
    },
    {
      role: 'main-route-link',
      components: [
        {
          label: TRANSACTION_HISTORY.NAV_ITEM,
          Icon: svgs.icons.SvgWallet,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
