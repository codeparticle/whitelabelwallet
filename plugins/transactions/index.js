import { TransactionHistoryPage } from './pages';

export const TransactionsPlugin = () => [
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
];