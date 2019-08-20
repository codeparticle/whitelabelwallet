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

  /**
   * This method will generate a testnet address.
   * @param {string} name.
   * @return {obj} returns an Address object model.
   */
  generateAddress = (name = '') => {
    const keyPair = bitcoin.ECPair.makeRandom({ network: walletManager.network });
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: walletManager.network });
    const testnetAddress = new Address(name, address);
    return testnetAddress;
  }

  /**
   * This method gets details for a specific address.
   * @param {string} name.
   * @return {obj} returns an Address object model.
   */
  getAddressDetails = async (addressParam) => {
    const rawAddress = (await api.get(`${ADDRESS}/${addressParam}`)).data.address;
    const address = new Address('', rawAddress);
    return address;
  }

  /**
   * This method gets recent unconfirmed transactions.
   * @return {obj} returns an Transaction object model.
   */
  getTransactions = async () => {
    const rawTxsData = (await api.get(TRANSACTIONS)).data;
    const transactions = rawTxsData.map(this.bitcoinTransactionFormatter);
    return transactions;
  }

  /**
   * This method get details of specific transaction. It takes transaction hash as a param
   * @param {string} txid.
   * @return {obj} returns an Transaction object model.
   */
  getTransactionDetails = async (txid) => {
    const rawTxData = (await  api.get(`${TRANSACTIONS}/${txid}`)).data;
    return this.bitcoinTransactionFormatter(rawTxData);
  }

  /**
   * This method gets the balance for an address
   * @return {number} returns number value.
   */
  getBalanceForAddress = async (addressParam) => {
    const balanceData = (await api.get(`${ADDRESS}/${addressParam}`)).data.balance;
    return balanceData;
  }

  /**
   * This method sends a fix value of 49000 satoshis to a randomly generated testnet address.
   * Some values are hard coded for testing purposes
   * @param {string} previousHash
   * @param {number} uTxOIndex
   * @return {number} returns number value.
   */
  sendToAddress = async (previousHash, uTxOIndex) => {
    // generate a receiver testnet address
    const receiverTestKeyPair = bitcoin.ECPair.makeRandom({ network: walletManager.network });
    const { address: receiverAddress } = bitcoin.payments.p2pkh({ pubkey: receiverTestKeyPair.publicKey, network: walletManager.network });

    // get your wallet's key pair from your private key.
    const myKeyPair = bitcoin.ECPair.fromWIF(walletManager.pk, walletManager.network);

    // set up the transactions variables: the fees, amount to keep, and amount to send;
    const totalFunds = await this.getBalanceForAddress(walletManager.addr);
    const fundsToKeep = totalFunds - 50000;
    const transactionFee = 1000;
    const amountToSend = totalFunds - fundsToKeep - transactionFee;

    // create a new Transaction using bitcoin-lib.js transaction builder.
    const tx = new bitcoin.TransactionBuilder(walletManager.network);
    tx.addInput(previousHash, uTxOIndex);
    tx.addOutput(receiverAddress, amountToSend);
    tx.addOutput(walletManager.addr, fundsToKeep);
    tx.sign(0, myKeyPair);
    const rawTxHex = tx.build().toHex();
    const newTxData = (await api.post(BROADCAST_TRANSACTION, { 'tx': rawTxHex })).data.tx;

    // Format the newly created transaction;
    const transaction = this.bitcoinTransactionFormatter(newTxData);
    return transaction;
  }

  /**
   * This function takes raw transactions and converts them to our desired Transaction model.
   * @param {obj} rawTx
   * @return {obj} returns a obj formatted to our Transaction Model.
   */
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

  /**
   * Helper function to get the wallets public address
   */
  getMyAddress = () => {
    return walletManager.addr;
  }

  /**
   * This function is used to parse txIns and txOuts and retrieve all the addresses
   * used in the transaction inputs and outputs.
   * @param {obj} txData
   */
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