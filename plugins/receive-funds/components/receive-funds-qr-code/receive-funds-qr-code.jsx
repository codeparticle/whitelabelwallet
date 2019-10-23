/**
 * @fileoverview QR Generator for Receiving Funds
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { QRCode } from '@codeparticle/whitelabelwallet.styleguide';

import { getFormattedAddressName } from 'plugins/receive-funds/helpers';
import { getAddress, getAmount } from 'plugins/receive-funds/rdx/selectors';
import { RECEIVE_FUNDS } from 'plugins/receive-funds/translations/keys';

const {
  QR_SENDER_INSTRUCTIONS,
  QR_TITLE,
  REQUEST_QR_TEXT,
} = RECEIVE_FUNDS;

function getTranslations(formatMessage, amount, formattedAddress) {
  return {
    amount: formatMessage(REQUEST_QR_TEXT, { amount }),
    addressName: formattedAddress,
    scan: formatMessage(QR_SENDER_INSTRUCTIONS),
  };
}

function ReceiveFundsQRCodeView({
  amount,
  address,
  formatMessage,
}) {
  const [qrString, setQrString] = useState(JSON.stringify({ amount, address }));
  const [formattedAddress, setFormattedAddress] = useState('');

  useEffect(() => {
    setQrString(JSON.stringify({ amount, address }));
  }, [address, amount]);

  useEffect(() => {
    if (address) {
      getFormattedAddressName(setFormattedAddress, address);
    } else {
      setFormattedAddress('');
    }
  }, [address]);

  return (
    <QRCode
      qrString={qrString}
      title={formatMessage(QR_TITLE)}
      translations={getTranslations(formatMessage, amount, formattedAddress)}
    />
  );
}

ReceiveFundsQRCodeView.propTypes = {
  amount: PropTypes.string,
  address: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
};

ReceiveFundsQRCodeView.defaultProps = {
  amount: '',
  address: '',
};

const mapStateToProps = state => {
  const amount = getAmount(state);
  const address = getAddress(state);

  return {
    amount,
    address,
  };
};

const ReceiveFundsQRCode = connect(mapStateToProps)(ReceiveFundsQRCodeView);

export { ReceiveFundsQRCode };
