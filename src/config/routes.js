import {
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
    key: 'not-found',
    component: NotFoundPage,
  },
];
