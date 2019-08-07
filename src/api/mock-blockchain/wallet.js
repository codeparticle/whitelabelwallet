import { ec } from 'elliptic';
import  _ from 'lodash';
import { api } from 'rdx/api';
import { Transaction, TxIn, TxOut, TransactionService } from 'api/mock-blockchain/transactions';
import { FileManager } from 'api/web/file-manager';
import { urls } from 'api/mock-blockchain/constants';

const {
  ADDRESS,
} = urls;

const EC = new ec('secp256k1');
const fileServiceInst = new FileManager(window.localStorage);

class WalletService {
  getPrivateFromWallet() {
    return fileServiceInst.getPrivateKey();
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
    const transactionServiceInst = new TransactionService();
    const myAddress = transactionServiceInst.getPublicKey(privateKey);
    const myUnspentTxOuts = unspentTxOuts.filter((uTxO) => uTxO.address === myAddress);
    const { includedUnspentTxOuts, leftOverAmount } = this.findTxOutsForAmount(amount, myUnspentTxOuts);

    const toUnsignedTxIn = (unspentTxOut) => {
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