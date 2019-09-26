import { ContactsPlugin } from './contacts';
import { MyWalletsPlugin } from './my-wallets';
import { ReceiveFundsPlugin } from './receive-funds';
import { SendFundsPlugin } from './send-funds';
import { TransactionHistoryPlugin } from './transaction-history';

export const plugins = [
  MyWalletsPlugin,
  TransactionHistoryPlugin,
  SendFundsPlugin,
  ReceiveFundsPlugin,
  ContactsPlugin,
];
