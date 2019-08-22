// ToDo: this is a sample file to test the PR and will be removed/reverted back to the original
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BitcoinBlockchainManager } from 'api/bitcoin/blockchain';
import { walletManager } from 'api/bitcoin/wallet';
import './index.scss';

const BlueButton = () => {
  const blockchainManager = BitcoinBlockchainManager.instance;

  const generateWallet = () => {
    walletManager.initialize();
  };

  const createTransactions = async () => {
    const transactionParams = {
      receiverAddress: blockchainManager.generateAddress().address,
      totalFunds: await blockchainManager.getBalanceForAddress(blockchainManager.getMyAddress()),
      fee: 1000,
      amount: 49000,
    };

    // While testing this change the params passed to sendToAddress: add new tx hash and uTxO index
    blockchainManager.sendToAddress('39a71be1ccae94f7df02bf9ad982646ab97edda5923e61fbce2b8e1b0ff91aeb', 0, transactionParams);
  };

  const testFunc = async () => {
    console.log(await blockchainManager.getAddressDetails(blockchainManager.getMyAddress()));
  };

  const getBalance = async () => {
    console.log(await blockchainManager.getBalanceForAddress(blockchainManager.getMyAddress())); // 2803717
  };

  return (
    <Fragment>
      <strong>
        {'Bitcoin P.O.C'}
      </strong>
      <br/>
      {'Step 1: generate wallet/private key(if you dont have one already) '}
      <button onClick={generateWallet}>
        Create Wallet used for Transactions
      </button>
      <br/>
      {'Step 2: add some bitcoins to your new address '}
      <a href="https://coinfaucet.eu/en/btc-testnet/" target="_blank">using this faucet</a>
      <br/>
      {'Step 3: update params passed to function on line 17 of this file'}
      <br/>
      {'Step 4: Send some bitcoin '}
      <button onClick={createTransactions}>
        Send bitcoin
      </button>
      <br/>
      <br/>
      <strong>
        {'Other actions/Test'}
      </strong>
      <br/>
      {'find wallet balance '}
      <button onClick={getBalance}>
      Get Balance
      </button>
      <br/>
      {'test button '}
      <button onClick={testFunc}>
      Conduct A Test
      </button>
      <br/>
      <br/>

    </Fragment>
  );
};

BlueButton.propTypes = {
  updateForceRed: PropTypes.func,
};


const BlueButtonComponent = (BlueButton);

const BlueButtonPlugin = () => {

  return [
    {
      role: 'test',
      components: BlueButtonComponent,
    },
  ];
};

export { BlueButtonPlugin };
