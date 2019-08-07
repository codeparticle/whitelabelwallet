import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { WalletService } from 'api/mock-blockchain/wallet';
import './index.scss';



const BlueButton = () => {
  const mockBlockchainManagerInst = new BlockchainManager();
  const walletInst = new WalletService();

  const generateWallet = () => {
    walletInst.initWallet();
  };

  const generateToAddress = () => {
    walletInst.generateToAddress();
  };
  const createTransactions = async () => {
    const address = (await mockBlockchainManagerInst.getLatestAddress()).address;
    mockBlockchainManagerInst.generatenextBlockWithTransaction(address, 10);
  };

  const createCoinBaseTx = () => {
    mockBlockchainManagerInst.generateNextBlock();
  };

  const testFunc = () => {
    mockBlockchainManagerInst.getTransactions();
  };

  const getBalance = async () => {
    console.log(await mockBlockchainManagerInst.getBalanceForAddress(walletInst.getPublicFromWallet(), await mockBlockchainManagerInst.getUnspentTxOs()));
  };

  return (
    <Fragment>
      <strong>
        {'Test Mock Blockchain'}
      </strong>
      <br/>
      {'step 1 generate wallet/private key(if you dont have one already) '}
      <button onClick={generateWallet}>
        Create Wallet used for Transacions
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
        {'Other acitons/Test'}
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
