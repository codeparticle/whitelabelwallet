/**
 * @fileoverview Send funds mobile alert
 * @author Gabriel Womble
 */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';

import { SendFundsReceipt } from 'plugins/send-funds/components';
import { constants, getAlertMessage } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import './send-funds-mobile-alert.scss';

const { MESSAGE_KEYS: { FAIL, SUCCESS } } = constants;
const { SUCCESS_HEADER } = SEND_FUNDS;
const ERROR_DURATION = 5000;

function SendFundsMobileAlert({
  alert,
  formatMessage,
  setAlert,
  resetFields,
}) {
  const alertData = alert ? alert.data : {};
  const [showAlertType, setShowAlertType] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const shouldShowAlertType = alertType => alertType === showAlertType;

  function onClose() {
    setAlert(null);
    resetFields();
  }

  function getMessage() {
    return getAlertMessage(formatMessage, alert);
  }

  // Handle setting alert type for proper alert rendering
  useEffect(() => {
    setShowAlertType(alert && alert.type);
  }, [alert]);

  // Handle Error Alert state & alert state resetting
  useEffect(() => {
    if (shouldShowAlertType(FAIL)) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setAlert(null);
        setShowErrorAlert(false);
      }, ERROR_DURATION);
    }
  }, [showAlertType]);

  return (
    <Fragment>
      <Visible when={showErrorAlert}>
        <div className="send-funds-gradient-border">
          <p className="send-funds-gradient-border__text">
            {getMessage()}
          </p>
        </div>
      </Visible>
      <SendFundsReceipt
        data={alertData}
        formatMessage={formatMessage}
        isOpen={shouldShowAlertType(SUCCESS)}
        title={formatMessage(SUCCESS_HEADER)}
        onClose={onClose}
      />
    </Fragment>
  );
}

SendFundsMobileAlert.propTypes = {
  alert: PropTypes.object,
  formatMessage: PropTypes.func.isRequired,
  resetFields: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

SendFundsMobileAlert.defaultProps = {
  alert: null,
};

export { SendFundsMobileAlert };
