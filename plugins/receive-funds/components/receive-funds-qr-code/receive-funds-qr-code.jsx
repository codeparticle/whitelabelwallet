/**
 * @fileoverview QR Generator for Receiving Funds
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { QRCode } from '@codeparticle/whitelabelwallet.styleguide';
import { useUnmount } from 'lib/hooks';

import { setAddress } from 'plugins/receive-funds/rdx/actions';
import { getAddressName } from 'plugins/receive-funds/helpers';
import { getAddress, getAmount } from 'plugins/receive-funds/rdx/selectors';
import { RECEIVE_FUNDS } from 'plugins/receive-funds/translations/keys';

const {
  QR_SENDER_INSTRUCTIONS,
  QR_TITLE,
  REQUEST_QR_TEXT,
} = RECEIVE_FUNDS;

function getTranslations(formatMessage, amount) {
  return {
    amount: formatMessage(REQUEST_QR_TEXT, { amount }),
    scan: formatMessage(QR_SENDER_INSTRUCTIONS),
  };
}

function getAddressNameFormat({ walletName, addressName }, isMobile) {
  if (isMobile) {
    return {
      walletName,
      addressName,
    };
  }

  const formattedName = addressName
    ? `${walletName} - ${addressName}`
    : walletName;

  return {
    addressName: formattedName,
  };
}

function ReceiveFundsQRCodeView({
  amount,
  address,
  formatMessage,
  isMobile,
  ...props
}) {
  const [qrString, setQrString] = useState(JSON.stringify({ amount, address }));
  const [addressFields, setAddressFields] = useState('');

  useEffect(() => {
    setQrString(JSON.stringify({ amount, address }));
  }, [address, amount]);

  useEffect(() => {
    getAddressName(setAddressFields, address);
  }, [address]);

  useUnmount(() => props.setAddress(''));

  return (
    <QRCode
      qrString={qrString}
      title={formatMessage(QR_TITLE)}
      translations={{
        ...getTranslations(formatMessage, amount),
        ...getAddressNameFormat(addressFields, isMobile),
      }}
    />
  );
}

ReceiveFundsQRCodeView.propTypes = {
  amount: PropTypes.string,
  address: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  setAddress,
};

const ReceiveFundsQRCode = connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsQRCodeView);

export { ReceiveFundsQRCode };
