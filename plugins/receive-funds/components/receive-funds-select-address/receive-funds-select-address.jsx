/**
 * @fileoverview Recieve Funds Mobile Select Address Component
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { empty } from 'lib/utils';

import { SelectAddresses } from 'plugins/send-funds/components';

import { setAddress } from 'plugins/receive-funds/rdx/actions';
import './receive-funds-select-address.scss';

function ReceiveFundsSelectAddressView({
  formatMessage,
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
        setFormSelecting={setFormSelecting}
        setToState={props.setAddress}
        setIsSelecting={empty}
      />
    </div>
  );
}

ReceiveFundsSelectAddressView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setIsFormSelecting: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAddress,
};

const ReceiveFundsSelectAddress = connect(null, mapDispatchToProps)(ReceiveFundsSelectAddressView);

export { ReceiveFundsSelectAddress };
