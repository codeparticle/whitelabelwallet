// ToDo: this is a sample file to test the PR and will be removed/reverted back to the original
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { WalletManager } from 'api/mock-blockchain/wallet';
import './index.scss';

const BlueButton = () => {
  const blockchainManager = BlockchainManager.instance;
  const walletManager = WalletManager.instance;

  const generateWallet = () => {
    walletManager.initWallet();
  };

  const generateToAddress = () => {
    walletManager.generateToAddress();
  };
  const createTransactions = async () => {
    const address = await blockchainManager.getLatestAddress();
    blockchainManager.generateNextBlockWithTransaction(address, 10);
  };

  const createCoinBaseTx = () => {
    blockchainManager.generateNextBlock();
  };

  const testFunc = async () => {
    console.log(await blockchainManager.getLatestAddress());
  };

  const getBalance = async () => {
    console.log(await blockchainManager.getBalanceForAddress(walletManager.getPublicFromWallet(), await blockchainManager.getUnspentTxOs()));
  };

  return (
    <Fragment>
      <strong>
        {'Test Mock Blockchain'}
      </strong>
      <br/>
      {'step 1 generate wallet/private key(if you dont have one already) '}
      <button onClick={generateWallet}>
        Create Wallet used for Transactions
      </button>
      <br/>
      {'step 2 add a coin(50 units) to your wallet available to spend '}
      <button onClick={createCoinBaseTx}>
        Add 50 units
      </button>
      <br/>
      {'step 3 generate to address '}
      <button onClick={generateToAddress}>
        Generate To Address
      </button>
      <br/>
      {'step 4 send 10 units to an address '}
      <button onClick={createTransactions}>
        Send 10 units
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
