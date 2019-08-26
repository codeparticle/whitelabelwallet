import { TransactionHistoryPage } from './pages';
import { addLocales } from './translations/add-locales';

export const TransactionHistoryPlugin = (store) => {
  store.dispatch(addLocales());

  return [
    {
      role: 'main-route',
      components: [
        {
          path: '/wallet/:id/transactions',
          component: TransactionHistoryPage,
          exact: true,
        },
      ],
    },
  ];
};
