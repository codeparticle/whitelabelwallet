/**
 * @fileoverview Flash Alert for Send Funds
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FlashAlert } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';

import {
  constants,
  getAlertMessage,
  getFormattedContactName,
  openInNewTab,
} from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const { TERTIARY } = VARIANTS;
const { MESSAGE_KEYS } = constants;
const { SUCCESS } = MESSAGE_KEYS;
const { VIEW_ON_BLOCKCHAIN } = SEND_FUNDS;

const FLASH_HEIGHT = '84px';

function getButton(alert, message) {
  if (alert && alert.type === SUCCESS) {
    const { data: { link } } = alert;

    return (
      <Button variant={TERTIARY} size="lg" onClick={() => openInNewTab(link)}>{message}</Button>
    );
  }

  return false;
}

function SendFundsFlashAlert({
  alert,
  formatMessage,
  resetFields,
  setAlert,
  toAddress,
}) {
  const [formattedName, setFormattedName] = useState(toAddress);
  const btnMessage = formatMessage(VIEW_ON_BLOCKCHAIN);

  function onClose() {
    setAlert(null);

    if (alert.type === SUCCESS) {
      resetFields();
    }
  }

  function getMessage() {
    return getAlertMessage(formatMessage, alert, formattedName);
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
      onClose={onClose}
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
  formatMessage: PropTypes.func.isRequired,
  resetFields: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  toAddress: PropTypes.string,
};

SendFundsFlashAlert.defaultProps = {
  alert: null,
  toAddress: '',
};

export { SendFundsFlashAlert };
