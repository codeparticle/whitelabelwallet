import { ec } from 'elliptic';
import * as _ from 'lodash';
import { api } from 'rdx/api';
import { Transaction, TxIn, TxOut, TransactionService } from 'api/mock-block-chainV2/transactions';
import { FileService } from 'api/web/file-service';
import { urls } from 'api/mock-data/constants';

const {
  ADDRESS,
} = urls;

const EC = new ec('secp256k1');
const fileServiceInst = new FileService(window.localStorage);

class WalletService {
  getPrivateFromWallet() {
    return fileServiceInst.getPrivateKey();
  };

  getPublicFromWallet() {
    const privateKey = this.getPrivateFromWallet();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    console.log('========\n', 'public', key.getPublic().encode('hex'), '\n========');
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

    const response  =  await api.post(ADDRESS, addressData);
    return response.data;
  }

  initWallet () {
    if (fileServiceInst.getPrivateKey() === null) {

      const newPrivateKey = this.generatePrivateKey();
      fileServiceInst.savePrivateKey(newPrivateKey);
      console.log('new wallet with private key created');
    }
  };

  /**
   * sum all the unspent transaction “owned” by that address:
   * @param {string} address
   * @param {array} unspentTxOuts
   */
  getBalance (address, unspentTxOuts) {
    return _(unspentTxOuts)
      .filter((uTxO) => uTxO.address === address)
      .map((uTxO) => uTxO.amount)
      .sum();
  };

  findTxOutsForAmount (amount, myUnspentTxOuts) {
    let currentAmount = 0;
    const includedUnspentTxOuts = [];
    for (const myUnspentTxOut of myUnspentTxOuts) {
      includedUnspentTxOuts.push(myUnspentTxOut);
      currentAmount = currentAmount + myUnspentTxOut.amount;
      if (currentAmount >= amount) {
        const leftOverAmount = currentAmount - amount;
        return { includedUnspentTxOuts, leftOverAmount };
      }
    }
    throw Error('not enough coins to send transaction');
  };

  createTxOuts = (receiverAddress, myAddress, amount, leftOverAmount) => {
    const txOut1 = new TxOut(receiverAddress, amount);
    if (leftOverAmount === 0) {
      return [txOut1];
    } else {
      const leftOverTx = new TxOut(myAddress, leftOverAmount);
      return [txOut1, leftOverTx];
    }
  };

  createTransaction (receiverAddress, amount, privateKey, unspentTxOuts) {
    debugger;
    // console.log('========\n', '1. receiverAddress', receiverAddress, '\n========');
    // console.log('========\n', 'amount', amount, '\n========');
    // console.log('========\n', 'privateKey', privateKey, '\n========');
    // console.log('========\n', 'unspentTxOuts', unspentTxOuts, '\n========');
    const transactionServiceInst = new TransactionService();
    const myAddress = transactionServiceInst.getPublicKey(privateKey);
    const myUnspentTxOuts = unspentTxOuts.filter((uTxO) => uTxO.address === myAddress);
    console.log('========\n', 'myUnspentTxOuts', myUnspentTxOuts, '\n========');

    const { includedUnspentTxOuts, leftOverAmount } = this.findTxOutsForAmount(amount, myUnspentTxOuts);

    console.log('========\n', 'includedUnspentTxOuts', includedUnspentTxOuts, '\n========');
    console.log('========\n', 'leftOverAmount', leftOverAmount, '\n========');

    const toUnsignedTxIn = (unspentTxOut) => {
      console.log('========\n', 'mapping over included unspentTxOuts', '\n========');
      console.log('========\n', 'unspentTxOut', unspentTxOut, '\n========');
      const txIn = new TxIn();
      txIn.txOutId = unspentTxOut.txOutId;
      txIn.txOutIndex = unspentTxOut.txOutIndex;
      return txIn;
    };

    const unsignedTxIns = includedUnspentTxOuts.map(toUnsignedTxIn);

    const tx = new Transaction();
    tx.txIns = unsignedTxIns;
    tx.txOuts = this.createTxOuts(receiverAddress, myAddress, amount, leftOverAmount);
    tx.txid = transactionServiceInst.getTransactionId(tx);

    tx.txIns = tx.txIns.map((txIn, index) => {
      txIn.signature = transactionServiceInst.signTxIn(tx, index, privateKey, unspentTxOuts);
      return txIn;
    });

    return tx;
  };

}

export {
  WalletService,
};