import { SendFundsPage } from './pages';

export const SendFundsPlugin = () => [
  {
    role: 'main-route',
    components: [
      {
        path: '/send',
        component: SendFundsPage,
        exact: true,
      },
    ],
  },
];