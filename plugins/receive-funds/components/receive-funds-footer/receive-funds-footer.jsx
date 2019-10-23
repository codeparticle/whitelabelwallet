/**
 * @fileoverview Receive Funds Footer
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Visible } from '@codeparticle/react-visible';
import { Button, PageFooter } from '@codeparticle/whitelabelwallet.styleguide';
import { COMMON } from 'translations/keys/common';
import { VARIANTS } from 'lib/constants';

import { copyToClipBoard, mailToOnClick } from 'plugins/receive-funds/helpers';
import { getAddress, getAmount } from 'plugins/receive-funds/rdx/selectors';
import { RECEIVE_FUNDS } from 'plugins/receive-funds/translations/keys';
import './receive-funds-footer.scss';

const { PRIMARY, SLATE_CLEAR } = VARIANTS;
const { EMAIL } = COMMON;
const {
  COPY_ADDRESS,
  EMAIL_BODY,
  EMAIL_SUBJECT,
  SELECTED_ADDRESS,
} = RECEIVE_FUNDS;

function ReceiveFundsFooterView({
  address,
  amount,
  formatMessage,
}) {
  const message = address
    ? formatMessage(SELECTED_ADDRESS, { address })
    : '';

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
    <PageFooter
      message={
        <Visible when={!!address}>
          <div className="receive-funds-footer__message">
            <h4>{message}</h4>
            <h5>{address}</h5>
          </div>
        </Visible>
      }
      button={
        <Visible when={!!address}>
          <div className="receive-funds-footer__btns">
            <Button size="lg" variant={SLATE_CLEAR} onClick={onCopyClicked}>
              {formatMessage(COPY_ADDRESS)}
            </Button>
            <Button size="lg" variant={PRIMARY} onClick={onEmailClicked}>
              {formatMessage(EMAIL)}
            </Button>
          </div>
        </Visible>
      }
    />
  );
}

ReceiveFundsFooterView.propTypes = {
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

const ReceiveFundsFooter = connect(mapStateToProps)(ReceiveFundsFooterView);

export { ReceiveFundsFooter };
