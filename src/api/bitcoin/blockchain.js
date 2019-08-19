import * as bitcoin from 'bitcoinjs-lib';
import { api } from 'rdx/api';
import { Address, Transaction } from 'models';
import { ApiBlockchainManager } from 'api/blockchain-manager';
import { walletManager } from 'api/bitcoin/wallet';
import { urls } from 'api/bitcoin/constants';

const {
  ADDRESS_DETAILS,
  TX_DETAILS,
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
    const { testnetAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: walletManager.network });
    const address = new Address(name, testnetAddress);
    console.log('========\n', 'address', address, '\n========');
    return address;
  }

  getAddressDetails = async (addressParam) => {
    const rawAddress = (await api.get(`${ADDRESS_DETAILS}${addressParam}`)).data.address;
    const address = new Address('', rawAddress);
    return address;
  }

  getTransactions = async () => {
    // DOES THIS WORK?
    const rawTxsData = (await api.get(`https://api.blockcypher.com/v1/btc/test3/txs`)).data;
    console.log('========\n', 'rawTxsData', rawTxsData, '\n========');
    const transactions = rawTxsData.map(this.bitcoinTransactionFormatter);
    console.log('========\n', 'transactions', transactions, '\n========');
    return transactions;
  }

  getTransactionDetails = async (txid) => {
    const rawTxData = (await  api.get(`${TX_DETAILS}${txid}`)).data;
    return this.bitcoinTransactionFormatter(rawTxData);
  }

  getBalanceForAddress = async (addressParam) => {
    const balanceData = (await api.get(`${ADDRESS_DETAILS}${addressParam}`)).data.balance;
    console.log('========\n', 'balanceData', balanceData, '\n========');
    return balanceData;
  }

  sendToAddress = () => {
    const tx = new bitcoin.TransactionBuilder();
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
    // console.log('========\n', 'tx', tx, '\n========');
    return tx;
  }

  getMyAddress = () => {
    console.log('========\n', 'walletManager.addr', walletManager.addr, '\n========');
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