import { ec } from 'elliptic';
import { existsSync, readFileSync,  writeFileSync } from 'fs';
import * as _ from 'lodash';
import { Transaction, TxIn, TxOut, TransactionService } from 'api/mock-block-chainV2/transactions';

const EC = new ec('secp256k1');
const privateKeyLocation = 'node/wallet/private_key';

class WalletService {
  getPrivateFromWallet() {
    const buffer = readFileSync(privateKeyLocation, 'utf8');
    return buffer.toString();
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
    tx.id = transactionServiceInst.getTransactionId(tx);

    tx.txIns = tx.txIns.map((txIn, index) => {
      txIn.signature = transactionServiceInst.signTxIn(tx, index, privateKey, unspentTxOuts);
      return txIn;
    });

    return tx;
  };

}

const initWallet =  () => {
  const walletServiceInst = new WalletService();
  // let's not override existing private keys
  if (existsSync(privateKeyLocation)) {
    return;
  }
  const newPrivateKey = walletServiceInst.generatePrivateKey();

  writeFileSync(privateKeyLocation, newPrivateKey);
  console.log('new wallet with private key created');
};

export {
  WalletService,
  initWallet,
};