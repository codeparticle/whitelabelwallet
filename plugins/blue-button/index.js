import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { blueButton } from './reducer';
import { updateForceRed } from './actions';
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { WalletService } from 'api/mock-blockchain/wallet';
import './index.scss';



const BlueButton = (props) => {
  const { forceRed } = props;
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
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={generateWallet}
      >
        Create Wallet used for Transacions
      </button>
      <br/>
      {'step 2 add a coin(50 units) to your wallet available to spend '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={createCoinBaseTx}
      >
        Add 50 units
      </button>
      <br/>
      {'step 3 generate to address '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={generateToAddress}
      >
        Generate To Address
      </button>
      <br/>
      {'step 4 send 10 units to an address '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={createTransactions}
      >
        Send 10 units
      </button>
      <br/>
      <br/>
      <strong>
        {'Other acitons/Test'}
      </strong>
      <br/>
      {'find wallet balance '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={getBalance}
      >
      Get Balance
      </button>
      <br/>
      {'test button '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={testFunc}
      >
      Conduct A Test
      </button>
      <br/>
      <br/>

    </Fragment>
  );
};

BlueButton.propTypes = {
  updateForceRed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    forceRed: state.blueButton.forceRed,
  };
};

const mapDispatchToProps = {
  updateForceRed,
};

const BlueButtonComponent = connect(mapStateToProps, mapDispatchToProps)(BlueButton);

const BlueButtonPlugin = (store) => {
  store.injectPluginReducer('blueButton', blueButton);

  return [
    {
      role: 'button',
      components: BlueButtonComponent,
    },
  ];
};

export { BlueButtonPlugin };
