import { ContactsPlugin } from './contacts';
import { MyWalletsPlugin } from './my-wallets';
import { ReceiveFundsPlugin } from './receive-funds';
import { SendFundsPlugin } from './send-funds';
import { TestRoutePlugin } from './test-route';
import { TransactionHistoryPlugin } from './transaction-history';
import { BlueButtonPlugin } from './blue-button';

export const plugins = [
  MyWalletsPlugin,
  TransactionHistoryPlugin,
  SendFundsPlugin,
  ReceiveFundsPlugin,
  ContactsPlugin,
  TestRoutePlugin,
  BlueButtonPlugin,
];
