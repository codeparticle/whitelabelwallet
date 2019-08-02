import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { blueButton } from './reducer';
import { updateForceRed } from './actions';
import { BlockchainManager } from 'api/mock-block-chainV2/blockchain';
import './index.scss';



const BlueButton = (props) => {
  const { forceRed } = props;
  const mockBlockchainManagerInst = new BlockchainManager();

  const onClick = () => {
    // props.updateForceRed(!forceRed);
    mockBlockchainManagerInst.generateAddress();
    // mockBlockchainManagerInst.getUnspentTxOs();

  };

  return (
    <Fragment>
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={console.log('generate wallet')}
      >
        Generate Wallet
      </button>
      <button
        className={`button ${forceRed ? 'red' : 'blue'}`}
        onClick={onClick}
      >
        Test Blockchain1
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
