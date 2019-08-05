import * as CryptoJS from 'crypto-js';
import * as ecdsa from 'elliptic';
import _ from 'lodash';

import { api } from 'rdx/api';
import { urls } from 'api/mock-blockchain/constants.js';
import { WalletService } from 'api/mock-blockchain/wallet';

const {
  UNSPENT_TX_OUTS,
} = urls;

const ec = new ecdsa.ec('secp256k1');
const walletInst = new WalletService();
const COINBASE_AMOUNT = 50;

/**
 * A transaction input must always refer to an unspent transaction output (uTxO). Consequently, when you own some coins in the blockchain, what you actually have is a list of unspent transaction outputs whose public key matches to the private key you own.
 */

class UnspentTxOut {
  constructor(txOutId, txOutIndex, address, amount) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }
}

/**
 * Transaction inputs (txIn) provide the information “where” the coins are coming from. Each txIn refer to an earlier output, from which the coins are ‘unlocked’, with the signature. These unlocked coins are now ‘available’ for the txOuts. The signature gives proof that only the user, that has the private-key of the referred public-key ( =address) could have created the transaction.
 */

class TxIn {
  constructor(txOutId, txOutIndex, signature) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.signature = signature;
  }
}

/**
 * Transaction outputs (txOut) consists of an address and an amount of coins. The address is an ECDSA public-key. This means that the user having the private-key of the referenced public-key (=address) will be able to access the coins
 */

class TxOut {
  constructor(address, amount) {
    this.address = address;
    this.amount = amount;
  }
}

class Transaction {
  constructor(txid, txIns, txOuts) {
    this.txid = txid;
    this.txIns = txIns;
    this.txOuts = txOuts;
  }
}

class TransactionService {

  async getUnspentTxOuts() {
    return (await api.get(UNSPENT_TX_OUTS)).data;
  }

  async addFundsToWallet(amount) {
    const address = walletInst.getPublicFromWallet();
    const unspentTxOuts = [];
    const unspentTxOutObj = {
      address,
      amount,
      label: 'force funds to wallet',
    };

    if (this.isValidTxOutStructure(unspentTxOutObj)) {
      console.log('tx out valid');
      unspentTxOuts.push(unspentTxOutObj);
      const response = await api.post(UNSPENT_TX_OUTS, unspentTxOuts);
      return new Promise(resolve => resolve(response.data));
    } else {
      console.log('tx out invalid');
    }
  }

  /**
 * The transaction id is calculated by taking a hash from the contents of the transaction
 * @param {obj} transaction
 */

  getTransactionId (transaction) {
    const txInContent = transaction.txIns
      .map((txIn) => txIn.txOutId + txIn.txOutIndex)
      .reduce((allTxInDataString, currentTxIn) => allTxInDataString + currentTxIn, '');

    const txOutContent = transaction.txOuts
      .map((txOut) => txOut.address + txOut.amount)
      .reduce((allTxOutDataString, currentTxOut) => allTxOutDataString + currentTxOut, '');

    return CryptoJS.SHA256(txInContent + txOutContent).toString();
  };

  // returns the amount value of a txIn
  getTxInAmount (txIn, aUnspentTxOuts) {
    return this.findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts).amount;
  };

  // returns matching uTxO
  findUnspentTxOut (transactionId, index, aUnspentTxOuts) {
    return aUnspentTxOuts.find((uTxO) => uTxO.txOutId === transactionId && uTxO.txOutIndex === index);
  };

  getCoinbaseTransaction (address, blockIndex) {
    const transObj = new Transaction();
    const txIn = new TxIn();
    txIn.signature = '';
    txIn.txOutId = '';
    txIn.txOutIndex = blockIndex;

    transObj.txIns = [txIn];
    transObj.txOuts = [new TxOut(address, COINBASE_AMOUNT)];
    transObj.txid = this.getTransactionId(transObj);
    return transObj;
  };

  /**
   * When signing the transaction inputs, only the txId will be signed. If any of the contents in the transactions are modified, the txId must change, making the transaction and signature invalid.
   * @param {obj} transaction
   * @param {num} txInIndex
   * @param {string} privateKey
   * @param {array} aUnspentTxOuts
   */

  signTxIn (transaction, txInIndex, privateKey, aUnspentTxOuts) {
    const txIn = transaction.txIns[txInIndex];

    const dataToSign = transaction.txid;
    const referencedUnspentTxOut = this.findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts);
    if (referencedUnspentTxOut == null) {
      console.log('could not find referenced txOut');
      throw Error();
    }
    const referencedAddress = referencedUnspentTxOut.address;

    if (this.getPublicKey(privateKey) !== referencedAddress) {
      console.log('trying to sign an input with private' + ' key that does not match the address that is referenced in txIn');
      throw Error();
    }
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const signature = this.toHexString(key.sign(dataToSign).toDER());

    return signature;
  };

  /**
   * @param {obj} newTransactions
   * @param {array} aUnspentTxOuts
   */
  updateUnspentTxOuts (newTransactions, aUnspentTxOuts) {
    //  We will first retrieve all new unspent transaction outputs from the new block
    const newUnspentTxOuts = newTransactions
      .map((transObj) => {
        return transObj.txOuts.map((txOut, index) => new UnspentTxOut(transObj.txid, index, txOut.address, txOut.amount));
      })
      .reduce((uTxOCollection, uTxO) => uTxOCollection.concat(uTxO), []);

    // Need to know which transaction outputs are consumed by the new transactions of the block
    const consumedTxOuts = newTransactions
      .map((transObj) => transObj.txIns)
      .reduce((txInCollection, txin) => txInCollection.concat(txin), [])
      .map((txIn) => new UnspentTxOut(txIn.txOutId, txIn.txOutIndex, '', 0));

    // we can generate the new unspent transaction outputs by removing the consumedTxOuts and adding the newUnspentTxOuts to our existing transaction outputs.
    const resultingUnspentTxOuts = aUnspentTxOuts.filter(((uTxO) => !this.findUnspentTxOut(uTxO.txOutId, uTxO.txOutIndex, consumedTxOuts)));
    resultingUnspentTxOuts.unshift(...newUnspentTxOuts);

    return resultingUnspentTxOuts;
  };

  processTransactions = (aTransactions, aUnspentTxOuts, blockIndex) => {
    if (!this.isValidTransactionsStructure(aTransactions)) {
      return null;
    }

    if (!this.validateBlockTransactions(aTransactions, aUnspentTxOuts, blockIndex)) {
      console.log('invalid block transactions');
      return null;
    }
    return this.updateUnspentTxOuts(aTransactions, aUnspentTxOuts);
  };

  toHexString (byteArray) {
    return Array.from(byteArray, (byte) => {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  };

  getPublicKey  (aPrivateKey) {
    return ec.keyFromPrivate(aPrivateKey, 'hex').getPublic().encode('hex');
  };

  validateTransaction (transaction, aUnspentTxOuts) {

    if (this.getTransactionId(transaction) !== transaction.txid) {
      console.log('invalid tx id: ' + transaction.txid);
      return false;
    }
    const hasValidTxIns = transaction.txIns
      .map((txIn) => this.validateTxIn(txIn, transaction, aUnspentTxOuts))
      .reduce((validatedTxIns, nextTxIn) => validatedTxIns && nextTxIn, true);

    if (!hasValidTxIns) {
      console.log('some of the txIns are invalid in tx: ' + transaction.txid);
      return false;
    }

    // The sums of the values specified in the outputs must be equal to the sums of the values specified in the inputs.
    const totalTxInValues = transaction.txIns
      .map((txIn) => this.getTxInAmount(txIn, aUnspentTxOuts))
      .reduce((allTxIns, nextTxIn) => (allTxIns + nextTxIn), 0);

    const totalTxOutValues = transaction.txOuts
      .map((txOut) => txOut.amount)
      .reduce((allTxOuts, nextTxOut) => (allTxOuts + nextTxOut), 0);

    if (totalTxOutValues !== totalTxInValues) {
      console.log('totalTxOutValues !== totalTxInValues in tx: ' + transaction.txid);
      return false;
    }

    return true;
  };

  validateBlockTransactions  (aTransactions, aUnspentTxOuts, blockIndex) {
    const coinbaseTx = aTransactions[0];
    if (!this.validateCoinbaseTx(coinbaseTx, blockIndex)) {
      console.log('invalid coinbase transaction: ' + JSON.stringify(coinbaseTx));
      return false;
    }

    // check for duplicate txIns. Each txIn can be included only once
    const txIns = _(aTransactions)
      .map(tx => tx.txIns)
      .flatten()
      .value();

    if (this.hasDuplicates(txIns)) {
      return false;
    }

    // all but coinbase transactions
    const normalTransactions = aTransactions.slice(1);
    return normalTransactions.map((tx) => this.validateTransaction(tx, aUnspentTxOuts))
      .reduce((a, b) => (a && b), true);
  };

  hasDuplicates (txIns) {
    const groups = _.countBy(txIns, (txIn) => txIn.txOutId + txIn.txOutId);
    return _(groups)
      .map((value, key) => {
        if (value > 1) {
          console.log('duplicate txIn: ' + key);
          return true;
        } else {
          return false;
        }
      })
      .includes(true);
  };

  validateCoinbaseTx (transaction, blockIndex) {
    if (transaction == null) {
      console.log('the first transaction in the block must be coinbase transaction');
      return false;
    }
    if (this.getTransactionId(transaction) !== transaction.txid) {
      console.log('invalid coinbase tx id: ' + transaction.txid);
      return false;
    }
    if (transaction.txIns.length !== 1) {
      console.log('one txIn must be specified in the coinbase transaction');
      return;
    }
    if (transaction.txIns[0].txOutIndex !== blockIndex) {
      console.log('the txIn signature in coinbase tx must be the block height');
      return false;
    }
    if (transaction.txOuts.length !== 1) {
      console.log('invalid number of txOuts in coinbase transaction');
      return false;
    }
    if (transaction.txOuts[0].amount != COINBASE_AMOUNT) {
      console.log('invalid coinbase amount in coinbase transaction');
      return false;
    }
    return true;
  };

  // The signatures in the txIns must be valid and the referenced outputs must have not been spent.
  validateTxIn (txIn, transaction, aUnspentTxOuts) {
    const referencedUTxOut = aUnspentTxOuts.find((uTxO) =>  uTxO.txOutId === txIn.txOutId);
    if (referencedUTxOut == null) {
      console.log('referenced txOut not found: ' + JSON.stringify(txIn));
      return false;
    }
    const address = referencedUTxOut.address;

    const key = ec.keyFromPublic(address, 'hex');
    return key.verify(transaction.txid, txIn.signature);
  };

  isValidTxInStructure (txIn) {
    if (txIn == null) {
      console.log('txIn is null');
      return false;
    } else if (typeof txIn.signature !== 'string') {
      console.log('invalid signature type in txIn');
      return false;
    } else if (typeof txIn.txOutId !== 'string') {
      console.log('invalid txOutId type in txIn');
      return false;
    } else if (typeof  txIn.txOutIndex !== 'number') {
      console.log('invalid txOutIndex type in txIn');
      return false;
    } else {
      return true;
    }
  };

  isValidTxOutStructure (txOut) {
    if (txOut == null) {
      console.log('txOut is null');
      return false;
    } else if (typeof txOut.address !== 'string') {
      console.log('invalid address type in txOut');
      return false;
    } else if (!this.isValidAddress(txOut.address)) {
      console.log('invalid TxOut address');
      return false;
    } else if (typeof txOut.amount !== 'number') {
      console.log('invalid amount type in txOut');
      return false;
    } else {
      return true;
    }
  };

  isValidTransactionsStructure (transactions) {
    return transactions
      .map(this.isValidTransactionStructure.bind(this))
      .reduce((checkedTransactions, uncheckedTransaction) => (checkedTransactions && uncheckedTransaction), true);
  };

  isValidTransactionStructure (transaction) {
    if (typeof transaction.txid !== 'string') {
      console.log('transactionId missing');
      return false;
    }
    if (!(transaction.txIns instanceof Array)) {
      console.log('invalid txIns type in transaction');
      return false;
    }

    if (!transaction.txIns.map(this.isValidTxInStructure).reduce((checkedTxIns, uncheckedTxIn) => (checkedTxIns && uncheckedTxIn), true)) {
      return false;
    }

    if (!(transaction.txOuts instanceof Array)) {
      console.log('invalid txIns type in transaction');
      return false;
    }

    if (!transaction.txOuts
      .map(this.isValidTxOutStructure.bind(this))
      .reduce((checkedTxOuts, uncheckedTxOut) => (checkedTxOuts && uncheckedTxOut), true)) {
      return false;
    }
    return true;
  }

  // valid address is a valid ecdsa public key in the 04 + X-coordinate + Y-coordinate format
  isValidAddress (address) {
    if (address.length !== 130) {
      console.log('invalid public key length');
      return false;
    } else if (address.match('^[a-fA-F0-9]+$') === null) {
      console.log('public key must contain only hex characters');
      return false;
    } else if (!address.startsWith('04')) {
      console.log('public key must start with 04');
      return false;
    }
    return true;
  };
}

export {
  TxOut,
  UnspentTxOut,
  TxIn,
  Transaction,
  TransactionService,
};


