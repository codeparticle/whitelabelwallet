/**
 * @fileoverview Select Addresses view for mobile send funds
 * @author Gabriel Womble
 */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MobileWalletList } from '@codeparticle/whitelabelwallet.styleguide';
import { useUnmount } from 'lib/hooks';

import { getWalletAddresses } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { preSelectFromAddress } from 'plugins/send-funds/rdx/actions';
import { getPreSelectedFromAddress } from 'plugins/send-funds/rdx/selectors';

const { SELECT_ADDRESS, NUM_ADDRESSES } = SEND_FUNDS;

function SelectAddressesView({
  formatMessage,
  preSelectedFromAddress,
  setFormSelecting,
  setToState,
  setIsSelecting,
  ...props
}) {
  const [rowData, setRowData] = useState([]);

  useUnmount(props.preSelectFromAddress);

  function subtitleFormatter(data) {
    return formatMessage(NUM_ADDRESSES, { addressCount: data.length });
  }

  function onAddressClicked(data) {
    setToState(data);
    setIsSelecting(false);
    setFormSelecting(false);
  }

  useEffect(() => {
    getWalletAddresses().then((data) => {
      setRowData(data);
    });
  }, [setRowData]);

  return (
    <Fragment>
      <label>
        <span>{`${formatMessage(SELECT_ADDRESS)}:`}</span>
      </label>
      <MobileWalletList
        data={rowData}
        preSelect={preSelectedFromAddress}
        onAddressClicked={onAddressClicked}
        subtitleFormatter={subtitleFormatter}
      />
      <style jsx>
        {`
          label {
            width: 100%;
          }
        `}
      </style>
    </Fragment>
  );
}

SelectAddressesView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  preSelectFromAddress: PropTypes.func.isRequired,
  preSelectedFromAddress: PropTypes.object,
  setFormSelecting: PropTypes.func.isRequired,
  setToState: PropTypes.func.isRequired,
  setIsSelecting: PropTypes.func.isRequired,
};

SelectAddressesView.defaultProps = {
  preSelectedFromAddress: null,
};

const mapStateToProps = state => {
  const preSelectedFromAddress = getPreSelectedFromAddress(state);

  return {
    preSelectedFromAddress,
  };
};

const mapDispatchToProps = {
  preSelectFromAddress,
};

export const SelectAddresses = connect(mapStateToProps, mapDispatchToProps)(SelectAddressesView);
