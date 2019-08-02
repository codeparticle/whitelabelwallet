import { ContactsPage } from './pages';

export const ContactsPlugin = () => [
  {
    role: 'main-route',
    components: [
      {
        path: '/contacts',
        component: ContactsPage,
        exact: true,
      },
    ],
  },
];
