import {
  AuthPage,
  NotFoundPage,
} from 'pages';
import { RedirectToHome } from 'components';

export const routes = [
  {
    key: 'redirect',
    path: '/',
    component: RedirectToHome,
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
