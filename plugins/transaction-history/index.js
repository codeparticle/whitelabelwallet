import { svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { TransactionHistoryPage } from './pages';
import { addLocales } from './translations/add-locales';
import pluginId from './plugin-id';
import { transactionsReducer } from './rdx/reducers';
import { TRANSACTION_HISTORY } from './translations/keys';

export const TransactionHistoryPlugin = (store) => {
  store.dispatch(addLocales());
  store.injectPluginReducer('transactionsData', transactionsReducer);

  return [
    {
      role: 'main-route',
      components: [
        {
          path: '/transaction-history',
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
          Icon: svgs.icons.SvgTransactionHistory,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
