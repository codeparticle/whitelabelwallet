import {
  AuthPage,
  MainPage,
  NotFoundPage,
} from 'pages';

export const routes = [
  {
    key: 'main',
    path: '/',
    component: MainPage,
    exact: true,
  },
  {
    key: 'auth',
    path: ['/login', '/signup'],
    component: AuthPage,
    exact: true,
  },
  {
    key: 'not-found',
    component: NotFoundPage,
  },
];
