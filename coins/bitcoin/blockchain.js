import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import { api } from 'rdx/api';
import { Address, Transaction } from 'models';
import { ApiBlockchainManager } from 'api/api-blockchain-manager';
import { walletManager } from 'coins/bitcoin/wallet';
import { BIP32, NETWORK, urls } from 'coins/bitcoin/constants';

const {
  ADDRESS,
  BALANCE,
  BROADCAST_TRANSACTION,
  TRANSACTIONS,
} = urls;

class BitcoinBlockchainManager extends ApiBlockchainManager {
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
   * Base method that returns a single address from seed
   * @returns {Object} - address and privateKey
   * @param {string} mnemonicSeed - string seed from wallet
   */
  generateAddressFromSeed(mnemonicSeed, account = 0, changeChain = BIP32.CHANGE_CHAIN.EXTERNAL, numberOfAddresses = 0) {
    const addressIncrement = numberOfAddresses + 1;
    const seed = bip39.mnemonicToSeedSync(mnemonicSeed);
    const node = bip32.fromSeed(seed);
    const derived = node.derivePath(`${BIP32.DERIVATION_PATH_BASE}/${account}'/${changeChain}/${addressIncrement}`);
    const { publicKey, privateKey } = derived;
    const { address } = bitcoin.payments.p2pkh({ pubkey: publicKey, network: bitcoin.networks[NETWORK] });

    return {
      address,
      index: addressIncrement,
      privateKey: privateKey.toString('hex'),
    };
  }

  /**
   * Method to fetch a single address balance from API
   * @returns {Number} balance - the address balance
   * @param {String} address - the public address string
   */
  async fetchAddressBalance(address) {
    const addrUrl = BALANCE(address);
    const res = await api.get(addrUrl);
    const { balance } = res.data;

    return balance;
  }

  /**
   * This method will generate a testnet address.
   * @param {string} name.
   * @return {obj} returns an Address object model.
   */
  generateAddress = (name = '') => {
    const keyPair = bitcoin.ECPair.makeRandom({ network: walletManager.network });
    const { address: testnetAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: walletManager.network });
    const address = new Address(name, testnetAddress);
    return address;
  }

  /**
   * This method gets details for a specific address.
   * @param {string} addressParam.
   * @return {obj} returns an Address object model.
   */
  getAddressDetails = async (addressParam) => {
    const rawAddress = (await api.get(`${ADDRESS}/${addressParam}`)).data.address;
    const address = new Address('', rawAddress);
    return address;
  }
  /**
   * This method creates a new address and transfers the balance left from the old address to the new one.
   * @param {string} addressParam.
   * @return {obj} returns an Address.
   */
  async refreshAddress(wallet, addressParam) {
    /*eslint-disable */
    const balance = await this.getBalanceForAddress(addressParam.address);
    /* eslint-enable */
    const addressData = this.generateAddressFromSeed(wallet.seed, BIP32.ACCOUNT_BASE, BIP32.CHANGE_CHAIN.EXTERNAL, wallet.address_index);
    // Todo: create transaction using balance, newAddress and addressParam.address when WLW-161 is merged in.

    return {
      address: addressData.address,
      index: addressData.index,
      privateKey: addressData.privateKey,
    };
  };

  /**
   * This method gets recent unconfirmed transactions.
   * @return {obj} returns an Transaction object model.
   */
  getTransactions = async () => {
    const rawTxsData = (await api.get(TRANSACTIONS)).data;
    return rawTxsData.map(this.bitcoinTransactionFormatter);
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
    const { balance } = (await api.get(`${ADDRESS}/${addressParam}`)).data;
    return balance;
  }

  /**
   * This method sends a fix value of 49000 satoshis to a randomly generated testnet address.
   * Transactions params must include: amount, totalFundsAvailable, fee, and receiverAddress.
   * @param {string} previousHash
   * @param {number} uTxOIndex
   * @param {obj} transactionParams
   * @return {number} returns number value.
   */
  sendToAddress = async (previousHash, uTxOIndex, transactionParams) => {
    // get your wallet's key pair from your private key.
    const myKeyPair = bitcoin.ECPair.fromWIF(walletManager.pk, walletManager.network);

    // calculate change amount;
    const fundsToKeep = transactionParams.totalFunds - transactionParams.fee - transactionParams.amount;

    // create a new Transaction using bitcoin-lib.js transaction builder.
    const tx = new bitcoin.TransactionBuilder(walletManager.network);
    tx.addInput(previousHash, uTxOIndex);
    tx.addOutput(transactionParams.receiverAddress, transactionParams.amount);
    tx.addOutput(walletManager.addr, fundsToKeep);
    tx.sign(0, myKeyPair);
    const rawTxHex = tx.build().toHex();
    const newTxData = (await api.post(BROADCAST_TRANSACTION, { 'tx': rawTxHex })).data.tx;

    // return formatted the newly created transaction;
    return this.bitcoinTransactionFormatter(newTxData);
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