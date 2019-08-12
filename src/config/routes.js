import {
  AuthPage,
  MainPage,
  NotFoundPage,
} from 'pages';
import { svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';

const { NAVIGATION } = TRANSLATION_KEYS;
const {
  SvgWallet,
  SvgSend,
  SvgReceive,
  SvgContact,
} = svgs.icons;

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

export const navigation = [
  {
    label: NAVIGATION.MY_WALLETS_NAV_ITEM,
    Icon: SvgWallet,
    path: '/my-wallets',
  },
  {
    label: NAVIGATION.TRANSACTION_HISTORY_NAV_ITEM,
    Icon: SvgWallet,
    path: '/transaction-history',
  },
  {
    label: NAVIGATION.SEND_FUNDS_NAV_ITEM,
    Icon: SvgSend,
    path: '/send',
  },
  {
    label: NAVIGATION.RECEIVE_FUNDS_NAV_ITEM,
    Icon: SvgReceive,
    path: '/receive',
  },
  {
    label: NAVIGATION.CONTACTS_NAV_ITEM,
    Icon: SvgContact,
    path: '/contacts',
  },
];
