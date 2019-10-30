/**
 * @fileoverview Coin agnostic wallet actions
 * @author Gabriel Womble
 */
import { BlockchainManager } from 'coins';
import { asyncForEach, satoshiToFloat } from 'lib/utils';

export class WalletManager {
  constructor(manager) {
    this.manager = manager;
    this.blockchainManager = BlockchainManager;
  }

  /**
   * Function that adds a new wallet to the db
   * @param {Object} wallet - the wallet object to add to the db
   */
  async createWallet(wallet) {
    await this.manager.databaseManager.insert(false).wallet(wallet);
    const { address, privateKey: private_key } = this.blockchainManager.generateAddressFromSeed(wallet.seed);
    const insertedWallet = await this.manager.databaseManager.getLastWallet();

    await this.manager.databaseManager.insert().address({
      address,
      private_key,
      wallet_id: insertedWallet.id,
    });

    await this.manager.saveDatabase();
  }

  /**
   * Function that is called on a polling interval in CryptoPoller
   * Gets addresses from DB, and then compares their balances against the
   * balances retrieved by the blockchainManager's fetchAddressBalance (api) call
   * @returns {Boolean} - true if a balance was updated, false if not.
   */
  async pollAddressBalances() {
    const addresses = await this.manager.databaseManager.getAddresses();
    let hasUpdates = false;

    // Loop through addresses & compare against api values.
    await asyncForEach(addresses, async (address) => {
      const newBalance = await this.blockchainManager.fetchAddressBalance(address.address);

      if (typeof newBalance === 'number') {
        const newFormatted = satoshiToFloat(newBalance);

        if (newFormatted !== address.balance) {
          hasUpdates = true;
          const { id } = address;
          const balance = newFormatted;

          await this.manager.databaseManager.updateAddressById(id, { balance });
        }
      }

    });

    if (hasUpdates) {
      this.manager.saveDatabase();
    }

    return hasUpdates;
  }

  /**
   * Function that generates deterministic pass phrase
   * @returns {Array} Secret Phrase
   * @param {String} locale - locale code to determine wordlist to use
   */
  generateSecretPhrase(locale) {
    return this.blockchainManager.phraseToArray(this.blockchainManager.generateSecretPhrase(locale));
  }
}
