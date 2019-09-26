import { ec } from 'elliptic';
import { api } from 'rdx/api';
import { FileManager } from 'api/web/file-manager';
import { urls } from 'api/blockchain/mock-blockchain/constants';
import { Address } from 'models';

const {
  ADDRESS,
} = urls;

const EC = new ec('secp256k1');
const fileManager = new FileManager(window.localStorage);

class WalletManager {
  // This class instance is always fetched using "WalletManager.instance"
  static get instance() {
    if (!this._instance) {
      this._instance = new WalletManager();
    }
    return this._instance;
  }
  // Used to reset WalletManager.instance
  static resetInstance() {
    this._instance = null;
  }

  // Get the wallets private key from storage
  getPrivateFromWallet() {
    return fileManager.getPrivateKey();
  };

  // Get Wallet's public key
  getPublicFromWallet() {
    const privateKey = this.getPrivateFromWallet();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
  };

  // Generate a new private key that can be used in transactions
  generatePrivateKey () {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
  };

  /**
   * This function could be used to generate an "To Address" to send funds
   * @param {string} description
   * @param {string} label
   */
  async generateToAddress(description = '', label = '') {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    const publicKey = key.getPublic().encode('hex');

    const addressData = {
      address: publicKey,
      privateKey,
      isMine: false,
      description,
      label,
    };

    const rawAddress  =  (await api.post(ADDRESS, addressData)).data;
    const address = new Address(rawAddress.id, rawAddress.label, rawAddress.address);
    return address;
  }

  /**
   * This function is called when first initializing a new wallet.
   * It will create a new private/public key pair that can be used in transactions.
   */
  initWallet () {
    if (fileManager.getPrivateKey() === null) {
      const newPrivateKey = this.generatePrivateKey();
      fileManager.savePrivateKey(newPrivateKey);
      console.log('new wallet with private key created');
    }
  };
}

export {
  WalletManager,
};