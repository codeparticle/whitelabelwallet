import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { connect } from 'react-redux';
import { blueButton } from './reducer';
import { updateForceRed } from './actions';
import './index.scss';

const BlueButton = (props) => {
  const { forceRed } = props;

  const onClick = () => {
    props.updateForceRed(!forceRed);
  };

  return (
    <Button
      className={`button ${forceRed ? 'red' : 'blue'}`}
      onClick={onClick}
    >
      The Redux {forceRed ? 'Red' : 'Blue'} Button Plugin
    </Button>
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
