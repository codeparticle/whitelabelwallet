/**
 * @fileoverview Mobile Footer Buttons Component
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';

import { copyToClipBoard, mailToOnClick } from 'plugins/receive-funds/helpers';
import { getAddress, getAmount } from 'plugins/receive-funds/rdx/selectors';
import { RECEIVE_FUNDS } from 'plugins/receive-funds/translations/keys';
import './receive-funds-mobile-actions.scss';

const {
  COPY_RAW,
  EMAIL_BODY,
  EMAIL_QR,
  EMAIL_SUBJECT,
  SHARE_ADDRESS,
} = RECEIVE_FUNDS;
const { PRIMARY, SLATE } = VARIANTS;

function ReceiveFundsMobileActionsView({
  address,
  amount,
  formatMessage,
}) {
  function onCopyClicked() {
    copyToClipBoard(address);
  }

  function onEmailClicked() {
    const subject = formatMessage(EMAIL_SUBJECT);
    const body = formatMessage(EMAIL_BODY, {
      hasAmount: Boolean(amount).toString(),
      amount,
      address,
    });

    mailToOnClick({ subject, body });
  }

  return (
    <div className="receive-funds-mobile-actions">
      <h6 className="receive-funds-mobile-actions__header">{formatMessage(SHARE_ADDRESS)}</h6>
      <div className="receive-funds-mobile-actions__button">
        <Button
          onClick={onCopyClicked}
          size="full"
          variant={PRIMARY}
        >
          {formatMessage(COPY_RAW)}
        </Button>
      </div>
      <div className="receive-funds-mobile-actions__button">
        <Button
          onClick={onEmailClicked}
          size="full"
          variant={SLATE}
        >
          {formatMessage(EMAIL_QR)}
        </Button>
      </div>
    </div>
  );
}

ReceiveFundsMobileActionsView.propTypes = {
  address: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  formatMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const address = getAddress(state);
  const amount = getAmount(state);

  return {
    address,
    amount,
  };
};

const ReceiveFundsMobileActions = connect(mapStateToProps)(ReceiveFundsMobileActionsView);

export { ReceiveFundsMobileActions };
