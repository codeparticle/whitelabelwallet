/**
 * @fileoverview Recieve Funds Mobile Select Address Component
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { empty } from 'lib/utils';

import { SelectAddresses } from 'plugins/send-funds/components';

import { preSelectReceiver, setAddress } from 'plugins/receive-funds/rdx/actions';
import { getPreSelectedReceiver } from 'plugins/receive-funds/rdx/selectors';
import './receive-funds-select-address.scss';

function ReceiveFundsSelectAddressView({
  formatMessage,
  preSelectedReceiver,
  setIsFormSelecting,
  ...props
}) {
  function setFormSelecting(val)  {
    setIsFormSelecting(Boolean(val));
  }

  return (
    <div className="receive-funds-select-address">
      <SelectAddresses
        formatMessage={formatMessage}
        hideLabel
        preSelect={preSelectedReceiver}
        onUnmount={props.preSelectReceiver}
        setFormSelecting={setFormSelecting}
        setToState={props.setAddress}
        setIsSelecting={empty}
      />
    </div>
  );
}

ReceiveFundsSelectAddressView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  preSelectedReceiver: PropTypes.object,
  preSelectReceiver: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setIsFormSelecting: PropTypes.func.isRequired,
};

ReceiveFundsSelectAddressView.defaultProps = {
  preSelectedReceiver: null,
};

const mapStateToProps = state => {
  const preSelectedReceiver = getPreSelectedReceiver(state);

  return {
    preSelectedReceiver,
  };
};

const mapDispatchToProps = {
  preSelectReceiver,
  setAddress,
};

const ReceiveFundsSelectAddress = connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsSelectAddressView);

export { ReceiveFundsSelectAddress };
