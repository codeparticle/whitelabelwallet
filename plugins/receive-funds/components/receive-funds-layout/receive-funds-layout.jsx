/**
 * @fileoverview Component that manages layout of the Receive Funds Page
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';

import {
  ReceiveFundsAddressList,
  ReceiveFundsFooter,
  ReceiveFundsQRCode,
  RequestAmount,
} from 'plugins/receive-funds/components';
import './receive-funds-layout.scss';

function ReceiveFundsLayout({ formatMessage }) {
  return (
    <div className="receive-funds-layout">
      <div className="receive-funds-layout__list">
        <RequestAmount formatMessage={formatMessage} />
        <ReceiveFundsAddressList formatMessage={formatMessage} />
      </div>
      <div className="receive-funds-layout__qr-code">
        <ReceiveFundsQRCode formatMessage={formatMessage} />
      </div>
      <div className="receive-funds-layout__footer">
        <ReceiveFundsFooter formatMessage={formatMessage} />
      </div>
    </div>
  );
}

ReceiveFundsLayout.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export { ReceiveFundsLayout };
