/**
 * @fileoverview Flash Alert for Send Funds
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FlashAlert } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';

import { constants, getFormattedContactName } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const { TERTIARY } = VARIANTS;
const { MESSAGE_KEYS } = constants;
const {
  AMOUNT,
  TO_ADDRESS,
  SUCCESS,
} = MESSAGE_KEYS;

const {
  INSUFFICIENT_FUNDS,
  INVALID_ADDRESS,
  SEND_SUCCESSFUL,
  VIEW_ON_BLOCKCHAIN,
} = SEND_FUNDS;

const FLASH_HEIGHT = '84px';

const messages = {
  [AMOUNT]: INSUFFICIENT_FUNDS,
  [TO_ADDRESS]: INVALID_ADDRESS,
  [SUCCESS]: SEND_SUCCESSFUL,
};

function getButton(alert, message) {
  if (alert && alert.type === SUCCESS) {
    return (
      <Button variant={TERTIARY} size="lg">{message}</Button>
    );
  }

  return false;
}

function SendFundsFlashAlert({
  alert,
  formatMessage,
  amount,
  toAddress,
  setAlert,
}) {
  const [formattedName, setFormattedName] = useState(toAddress);
  const btnMessage = formatMessage(VIEW_ON_BLOCKCHAIN);

  function getMessage() {
    if (!alert) {
      return '';
    }

    const { message } = alert;

    return formatMessage(messages[message], {
      amount,
      address: toAddress,
      formattedName,
    });
  }

  useEffect(() => {
    if (toAddress) {
      getFormattedContactName(setFormattedName, toAddress);
    }
  }, [toAddress]);

  return (
    <FlashAlert
      alertButton={getButton(alert, btnMessage)}
      duration={5000}
      height={FLASH_HEIGHT}
      onClose={() => setAlert(null)}
      show={Boolean(alert)}
      message={getMessage()}
      type={alert && alert.type}
    />
  );
}

SendFundsFlashAlert.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  amount: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  toAddress: PropTypes.string,
};

SendFundsFlashAlert.defaultProps = {
  alert: null,
  amount: '',
  toAddress: '',
};

export { SendFundsFlashAlert };
