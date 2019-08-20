import * as bitcoin from 'bitcoinjs-lib';
import { api } from 'rdx/api';
import { Address, Transaction } from 'models';
import { ApiBlockchainManager } from 'api/blockchain-manager';
import { walletManager } from 'api/bitcoin/wallet';
import { urls } from 'api/bitcoin/constants';

const {
  ADDRESS,
  BROADCAST_TRANSACTION,
  TRANSACTIONS,
} = urls;

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
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: walletManager.network });
    const testnetAddress = new Address(name, address);
    console.log('========\n', 'address', testnetAddress, '\n========');
    return testnetAddress;
  }

  // gets details for a specific address
  getAddressDetails = async (addressParam) => {
    const rawAddress = (await api.get(`${ADDRESS}/${addressParam}`)).data.address;
    const address = new Address('', rawAddress);
    return address;
  }

  // gets recent unconfirmed transactions;
  getTransactions = async () => {
    const rawTxsData = (await api.get(TRANSACTIONS)).data;
    const transactions = rawTxsData.map(this.bitcoinTransactionFormatter);
    return transactions;
  }

  // get details of specific transaction
  getTransactionDetails = async (txid) => {
    const rawTxData = (await  api.get(`${TRANSACTIONS}/${txid}`)).data;
    return this.bitcoinTransactionFormatter(rawTxData);
  }

  // get balance for an address
  getBalanceForAddress = async (addressParam) => {
    const balanceData = (await api.get(`${ADDRESS}/${addressParam}`)).data.balance;
    return balanceData;
  }

  // sends 49000 satoshis to a randomly generated testnet address
  sendToAddress = async (previousHash, uTxOIndex) => {
    const receiverTestKeyPair = bitcoin.ECPair.makeRandom({ network: walletManager.network });
    const { address: receiverAddress } = bitcoin.payments.p2pkh({ pubkey: receiverTestKeyPair.publicKey, network: walletManager.network });
    const myKeyPair = bitcoin.ECPair.fromWIF(walletManager.pk, walletManager.network);
    const totalFunds = await this.getBalanceForAddress(walletManager.addr);
    const fundsToKeep = totalFunds - 50000;
    const transactionFee = 1000;
    const amountToSend = totalFunds - fundsToKeep - transactionFee;
    const tx = new bitcoin.TransactionBuilder(walletManager.network);
    tx.addInput(previousHash, uTxOIndex);
    tx.addOutput(receiverAddress, amountToSend);
    tx.addOutput(walletManager.addr, fundsToKeep);
    tx.sign(0, myKeyPair);
    const rawTxHex = tx.build().toHex();
    const newTxData = (await api.post(BROADCAST_TRANSACTION, { 'tx': rawTxHex })).data.tx;
    const transaction = this.bitcoinTransactionFormatter(newTxData);
    console.log('========\n', 'transaction', transaction, '\n========');
    return transaction;
  }

  rng = () => {
    return Buffer.from('YT8dAtK4d16A3P1z+TpwB2jJ4aFH3g9M1EioIBkLEV4=', 'base64');
  }

  bitcoinTransactionFormatter = (rawTx) => {
    const senderAddresses = this.addressAggregator(rawTx.inputs);
    const recipientAddresses = this.addressAggregator(rawTx.outputs);
    const tx = new Transaction(
      rawTx.hash,
      rawTx.total,
      '',
      { txIns: rawTx.inputs, txOuts: rawTx.outputs },
      rawTx.fees,
      senderAddresses,
      recipientAddresses,
    );
    return tx;
  }

  getMyAddress = () => {
    return walletManager.addr;
  }

  addressAggregator(txData) {
    const aggregateData = txData.map((group) => {
      if (group.addresses !== undefined && group.addresses !== null) {
        return group.addresses.map(address => address);
      }
      return null;
    }).reduce((allAddresses, currentAddress) => {
      if (allAddresses !== null) {
        return allAddresses.concat(currentAddress);
      }
      return allAddresses;
    });

    return aggregateData;
  }


}

export { BitcoinBlockchainManager };