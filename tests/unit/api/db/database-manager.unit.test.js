/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import { DatabaseManager } from 'api/db/database-manager';

const SEED = 'legal winner thank year wave sausage worth useful legal winner thank yellow';
const PRIVATE_KEY = 'f0e1d2c3b4a5968778695a4b3c2d1e0f';
const TX_DATE = '2020-01-02 10:00:00';

async function setupDb() {
  const databaseManager = new DatabaseManager();

  await databaseManager.generateTables();
  await databaseManager.insert().wallet({
    id: 1,
    name: 'Savings',
    coin_id: 1,
    multi_address: 0,
    require_password: 0,
    password_hash: 'hashed-password',
    seed: SEED,
    address_index: 0,
  });
  await databaseManager.insert().address({
    id: 1,
    wallet_id: 1,
    address: 'address-one',
    private_key: PRIVATE_KEY,
    name: 'Primary',
    is_active: 1,
    balance: 1.5,
    parent_id: null,
  });
  await databaseManager.insert().contact({
    id: 1,
    name: 'Alice',
    address: 'address-alice',
    description: 'friend',
  });
  await databaseManager.insert().transaction({
    id: 1,
    sender_address_id: 1,
    receiver_address_id: null,
    amount: 0.25,
    fee: 0.0001,
    transaction_id: 'tx-one',
    description: 'Coffee',
    sender_address: 'address-one',
    receiver_address: 'address-alice',
    status: 1,
    created_date: TX_DATE,
    transaction_type: 'send',
  });

  return databaseManager;
}

describe('DatabaseManager', () => {
  let databaseManager;

  beforeEach(async () => {
    databaseManager = await setupDb();
  });

  afterEach(() => {
    databaseManager.db.close();
  });

  describe('getContactsByValue', () => {
    it('matches contacts by the start of their name', async () => {
      const res = await databaseManager.getContactsByValue('Ali');

      expect(res).toHaveLength(1);
      expect(res[0].name).toEqual('Alice');
    });

    it('treats a search value containing a double quote as data', async () => {
      const res = await databaseManager.getContactsByValue('Jean "Ace" Doe');

      expect(res).toEqual([]);
    });

    it('does not let a search value select columns of another table', async () => {
      const res = await databaseManager.getContactsByValue(
        '" union select id, name, seed, description from Wallets --'
      );

      expect(JSON.stringify(res)).not.toContain(SEED);
    });
  });

  describe('getWalletAddressesByValue', () => {
    it('matches wallets by the start of their name', async () => {
      const res = await databaseManager.getWalletAddressesByValue('Sav');

      expect(res).toHaveLength(1);
      expect(res[0].name).toEqual('Savings');
    });

    it('does not let a search value select the stored private keys', async () => {
      const res = await databaseManager.getWalletAddressesByValue(
        '" union select id, private_key, id, name, address, balance from Addresses --'
      );

      expect(JSON.stringify(res)).not.toContain(PRIVATE_KEY);
    });
  });

  describe('searchTransactionsForValue', () => {
    it('matches transactions on any part of their description', async () => {
      const res = await databaseManager.searchTransactionsForValue(
        [{ address: 'address-one' }],
        'offe',
        null
      );

      expect(res).toHaveLength(1);
      expect(res[0].transaction_id).toEqual('tx-one');
    });

    it('treats a search value containing a double quote as data', async () => {
      const res = await databaseManager.searchTransactionsForValue(
        [{ address: 'address-one' }],
        'Jean "Ace" Doe',
        null
      );

      expect(res).toEqual([]);
    });
  });

  describe('searchTransactionsAndWalletsByValue', () => {
    it('matches transactions on the name of their wallet', async () => {
      const res = await databaseManager.searchTransactionsAndWalletsByValue(
        [{ address: 'address-one' }],
        'Savings',
        null
      );

      expect(res).toHaveLength(1);
      expect(res[0].transaction_id).toEqual('tx-one');
    });
  });

  describe('date filtered transaction queries', () => {
    it('returns transactions created after the given date', async () => {
      expect(await databaseManager.getTransactionsAfterDate('2019-01-01')).toHaveLength(1);
      expect(await databaseManager.getTransactionsAfterDate('2021-01-01')).toHaveLength(0);
    });

    it('returns transactions for an address after the given date', async () => {
      expect(await databaseManager.getTransactionsPerAddressAfterDate('address-one', '2019-01-01')).toHaveLength(1);
      expect(await databaseManager.getTransactionsPerAddressAfterDate('address-two', '2019-01-01')).toHaveLength(0);
    });
  });

  describe('getTransactionByDetails', () => {
    it('returns the transaction matching both the id and the type', async () => {
      expect(await databaseManager.getTransactionByDetails('tx-one', 'send')).toHaveLength(1);
      expect(await databaseManager.getTransactionByDetails('tx-one', 'receive')).toHaveLength(0);
    });
  });

  describe('updateTxByTxId', () => {
    it('updates only the transaction with the given id', async () => {
      await databaseManager.updateTxByTxId('tx-one', { description: 'Tea' });

      const [transaction] = await databaseManager.getTransactionByDetails('tx-one', 'send');
      expect(transaction.description).toEqual('Tea');
    });
  });

  describe('getTxAddressIds', () => {
    it('returns the address id of the sender and the contact id of the receiver', async () => {
      const res = await databaseManager.getTxAddressIds('address-one', 'address-alice');

      expect(res).toEqual({ sender_address_id: 1, receiver_address_id: 1 });
    });
  });

  describe('updateContactById', () => {
    it('stores a name containing a single quote verbatim', async () => {
      await databaseManager.updateContactById(1, { name: "Sam O'Neil" });

      const [contact] = await databaseManager.getContacts();
      expect(contact.name).toEqual("Sam O'Neil");
    });

    it('does not run a statement embedded in a contact field', async () => {
      await databaseManager.updateContactById(1, {
        name: "Mallory'; delete from Wallets; --",
      });

      const wallets = await databaseManager.getWallets();
      expect(wallets).toHaveLength(1);
    });
  });

  describe('getFormattedContactName', () => {
    it('formats the name of a known contact', async () => {
      expect(await databaseManager.getFormattedContactName('address-alice')).toEqual('Alice - (address-alice)');
    });

    it('falls back to the address of an unknown contact', async () => {
      expect(await databaseManager.getFormattedContactName('address-bob')).toEqual('address-bob');
    });
  });

  describe('deleteContactById', () => {
    it('deletes only the contact with the given id', async () => {
      await databaseManager.insert().contact({
        id: 2,
        name: 'Bob',
        address: 'address-bob',
        description: '',
      });
      await databaseManager.deleteContactById(1);

      const contacts = await databaseManager.getContacts();
      expect(contacts).toHaveLength(1);
      expect(contacts[0].name).toEqual('Bob');
    });
  });

  describe('getWalletById', () => {
    it('returns the matching wallet', async () => {
      const wallet = await databaseManager.getWalletById(1);

      expect(wallet.name).toEqual('Savings');
    });
  });

  describe('getWalletAddressesById', () => {
    it('returns the wallet with its addresses', async () => {
      const wallet = await databaseManager.getWalletAddressesById(1);

      expect(wallet.name).toEqual('Savings');
      expect(wallet.addresses).toHaveLength(1);
      expect(wallet.addresses[0].address).toEqual('address-one');
    });
  });

  describe('getWalletNameByAddress', () => {
    it('returns the name of the wallet holding the address', async () => {
      expect(await databaseManager.getWalletNameByAddress('address-one')).toEqual('Savings');
    });
  });

  describe('updateWalletById', () => {
    it('updates only the wallet with the given id', async () => {
      await databaseManager.updateWalletById(1, { name: 'Rainy Day', address_index: 3 });

      const wallet = await databaseManager.getWalletById(1);
      expect(wallet.name).toEqual('Rainy Day');
      expect(wallet.address_index).toEqual(3);
    });
  });

  describe('getPrivKeyFromAddress', () => {
    it('returns the private key stored for the address', async () => {
      const privateKey = await databaseManager.getPrivKeyFromAddress('address-one');

      expect(privateKey).toEqual(PRIVATE_KEY);
    });
  });

  describe('getBalanceByAddress', () => {
    it('returns the balance stored for the address', async () => {
      expect(await databaseManager.getBalanceByAddress('address-one')).toEqual(1.5);
    });
  });

  describe('getAddressName', () => {
    it('returns the wallet name and the address name', async () => {
      expect(await databaseManager.getAddressName('address-one')).toEqual({
        walletName: 'Savings',
        addressName: 'Primary',
      });
    });
  });

  describe('getAddressesByWalletId', () => {
    it('returns the addresses of the given wallet', async () => {
      expect(await databaseManager.getAddressesByWalletId(1)).toHaveLength(1);
      expect(await databaseManager.getAddressesByWalletId(2)).toHaveLength(0);
    });
  });

  describe('updateAddressById', () => {
    it('updates only the address with the given id', async () => {
      await databaseManager.updateAddressById(1, { balance: 2.75 });

      expect(await databaseManager.getBalanceByAddress('address-one')).toEqual(2.75);
    });
  });

  describe('deleteAddressById', () => {
    it('deletes only the address with the given id', async () => {
      await databaseManager.deleteAddressById(1);

      expect(await databaseManager.getAddresses()).toHaveLength(0);
    });
  });

  describe('updateUserTheme', () => {
    it('updates the theme when the statement has no where clause', async () => {
      await databaseManager.updateUserTheme('dark');

      const settings = await databaseManager.getUserSettings();
      expect(settings.theme).toEqual('dark');
    });
  });

  describe('updateDbVersion', () => {
    it('updates the row matching the previous version', async () => {
      await databaseManager.updateDbVersion({ db_version: 191115 }, 0);

      expect(await databaseManager.getCurrentVersion()).toEqual(191115);
    });
  });
});
