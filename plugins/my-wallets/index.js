import { MyWalletsPage } from './pages';

export const MyWalletsPlugin = () => [
  {
    role: 'main-route',
    components: [
      {
        path: '/my-wallets',
        component: MyWalletsPage,
        exact: true,
      },
    ],
  },
];
