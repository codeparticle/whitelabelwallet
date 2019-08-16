import * as bitcoin from 'bitcoinjs-lib';
import { api } from 'rdx/api';
import { Address } from 'models';
import { ApiBlockchainManager } from 'api/blockchain-manager';
import { walletManager } from 'api/bitcoin/wallet';

class  BitcoinBlockchainManager  extends ApiBlockchainManager {
// This class instance is always fetched using "BitcoinBlockchainManager.instance"
  static get instance() {
    if (!this._instance) {
      this._instance = new BitcoinBlockchainManager();
    }
    return this._instance;
  }
  // Used to reset a "BitcoinBlockchainManager.instance"
  static resetInstance() {
    this._instance = null;
  }

  // generates a testnet Address
  generateAddress = (name = '') => {
    const keyPair = bitcoin.ECPair.makeRandom({ network: walletManager.network });
    const { testnetAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: walletManager.network });
    const address = new Address(name, testnetAddress);
    console.log('========\n', 'address', address, '\n========');
    return address;
  }

  getAddressDetails = async (addressParam) => {
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${addressParam}/full?limit=50`;
    const addressDetails = await api.get(url);
    // const rawAddressData = {
    //   name: rawAddressData.name ? rawAddressData.name : '',
    //   address: rawAddressData.address,
    // };
    console.log('========\n', 'addressDetails', addressDetails, '\n========');
    // const address = new Address({ ...rawAddressData });
    // console.log('========\n', 'address', address, '\n========');
    // return address;
  }


}

export { BitcoinBlockchainManager };