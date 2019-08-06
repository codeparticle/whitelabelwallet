import { ReceiveFundsPage } from './pages';

export const ReceiveFundsPlugin = () => [
  {
    role: 'main-route',
    components: [
      {
        path: '/receive',
        component: ReceiveFundsPage,
        exact: true,
      },
    ],
  },
];