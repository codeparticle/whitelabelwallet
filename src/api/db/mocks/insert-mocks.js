import { DatabaseManager } from '../database-manager';
import * as address from './addresses.json';
import * as contact from './contacts.json';
import * as wallet from './wallets.json';
import * as transaction from './transactions.json';

/**
 * Function that loops through data object to insert
 * values into appropriate tables.
 */
export function insertMocks() {
  const dbInstance = DatabaseManager.instance;

  const data = {
    address,
    contact,
    transaction,
    wallet,
  };

  Object.keys(data).forEach((type) => {
    const vals = Object.values(data[type]);

    for (let k = 0; k < vals.length - 1; k++) {
      dbInstance.insert()[type](vals[k]);
    }
  });

  return true;
}
