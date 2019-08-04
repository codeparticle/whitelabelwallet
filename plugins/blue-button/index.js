import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { blueButton } from './reducer';
import { updateForceRed } from './actions';
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { WalletService } from 'api/mock-blockchain/wallet';
import { TransactionService } from 'api/mock-blockchain/transactions';
import './index.scss';



const BlueButton = (props) => {
  const { forceRed } = props;
  const mockBlockchainManagerInst = new BlockchainManager();
  const walletInst = new WalletService();
  const transactionServiceInst = new TransactionService();

  const generateWallet = () => {
    walletInst.initWallet();
  };

  const genrateToAddress = () => {
    walletInst.generateToAddress();
  };
  const createTransactions = () => {
    mockBlockchainManagerInst.generatenextBlockWithTransaction('04bff04b9e289eefd08789fcefbde50cf9857fab8208d4ff227a291aaf89e605a266aaffe0bec019ae2bb57e4ccc5b47d1dc06197ed7c6146f457570db56b915eb', 10);
  };

  const createCoinBaseTx = () => {
    mockBlockchainManagerInst.generateNextBlock();
  };

  const testFunc = () => {
    mockBlockchainManagerInst.getTransactionDetial('2e3c4ad270a2011657ac9833e50a30a8e96243932257972bead5336d6ec3e50a');
  };

  const getBalance = async () => {
    console.log(walletInst.getBalance(walletInst.getPublicFromWallet(), await transactionServiceInst.getUnspentTxOuts()));
  };

  return (
    <Fragment>
      {'step 1 generate wallet/private key(if you have already) '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={generateWallet}
      >
        Create Wallet used for Transacions
      </button>
      <br/>
      <br/>
      {'step 2 generate to address '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={genrateToAddress}
      >
        Generate To Address
      </button>
      <br/>
      {'step 3 set available funds to spend to 100 units '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={createCoinBaseTx}
      >
        fill
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
      {'find wallet balance '}
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={getBalance}
      >
      get balance
      </button>
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
