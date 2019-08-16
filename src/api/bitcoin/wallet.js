import * as bitcoin from 'bitcoinjs-lib';
import { FileManager } from 'api/web/file-manager';

const fileManager = new FileManager(window.localStorage);
const testNetwork = bitcoin.networks.testnet;
const init = () => {
  if (fileManager.getPrivateKey() === null) {
    const keyPair = bitcoin.ECPair.makeRandom({ network: testNetwork });
    const { address } =  bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testNetwork });
    const pk = keyPair.toWIF();

    fileManager.saveItem('myAddress', address);
    fileManager.savePrivateKey(pk);
  }

  return  'already initialized';
};

const walletManager = {
  network: testNetwork,
  addr: fileManager.getItem('myAddress'),
  pk: fileManager.getPrivateKey(),
  initialize: init,
};

export { walletManager };