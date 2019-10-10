/**
 * @fileoverview Select Addresses view for mobile send funds
 * @author Gabriel Womble
 */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MobileWalletList } from '@codeparticle/whitelabelwallet.styleguide';

import { getWalletAddresses } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const { SELECT_ADDRESS, NUM_ADDRESSES } = SEND_FUNDS;

function SelectAddresses({
  formatMessage,
  setFormSelecting,
  setFromAddress,
  setIsSelecting,
}) {
  const [rowData, setRowData] = useState([]);

  function subtitleFormatter(data) {
    return formatMessage(NUM_ADDRESSES, { addressCount: data.length });
  }

  function onAddressClicked(data) {
    setFromAddress(data);
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

SelectAddresses.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setFormSelecting: PropTypes.func.isRequired,
  setFromAddress: PropTypes.func.isRequired,
  setIsSelecting: PropTypes.func.isRequired,
};

export { SelectAddresses };
