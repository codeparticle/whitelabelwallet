import { ec } from 'elliptic';
import { api } from 'rdx/api';
import { FileManager } from 'api/web/file-manager';
import { urls } from 'api/mock-blockchain/constants';
import { Address } from 'models';

const {
  ADDRESS,
} = urls;

const EC = new ec('secp256k1');
const fileManager = new FileManager(window.localStorage);

class WalletManager {

  static get instance() {
    if (!this._instance) {
      this._instance = new WalletManager();
    }
    return this._instance;
  }

  static resetInstance() {
    this._instance = null;
  }

  getPrivateFromWallet() {
    return fileManager.getPrivateKey();
  };

  getPublicFromWallet() {
    const privateKey = this.getPrivateFromWallet();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
  };

  generatePrivateKey () {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
  };

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