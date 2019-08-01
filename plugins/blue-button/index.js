import React from 'react';
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
    mockBlockchainManagerInst.generateNextBlock('mockBlockChainData1');
    // mockBlockchainManagerInst.retrieveAddressBalance('znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf');
  };

  return (
    <button
      className={`button ${forceRed ? 'red' : 'blue'}`}
      onClick={onClick}
    >
      The Redux {forceRed ? 'Red' : 'Blue'} Button Plugin
    </button>
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
