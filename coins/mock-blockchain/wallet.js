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
import { ec } from 'elliptic';
import { api } from 'rdx/api';
import { FileManager } from 'api/web/file-manager';
import { urls } from 'coins/mock-blockchain/constants';
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