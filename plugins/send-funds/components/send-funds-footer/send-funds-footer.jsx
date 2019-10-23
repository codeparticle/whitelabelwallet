/**
 * @fileoverview Footer for send funds page
 * @author Gabriel Womble
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { Button, PageFooter } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { COMMON } from 'translations/keys/common';

import {
  SendFundsMobileFooter,
  SendFundsFlashAlert,
  SendFundsMobileAlert,
} from 'plugins/send-funds/components';
import { constants, createTransaction, valuesExist, validateTransaction } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const { MESSAGE_KEYS: { FAIL, SUCCESS } } = constants;
const { CONFIRM_SEND_TO } = SEND_FUNDS;
const { CONFIRM } = COMMON;
const { GREEN } = VARIANTS;

function SendFundsFooter({
  amount,
  isMobile,
  formatMessage,
  fromAddress,
  memo,
  toAddress,
  resetFields,
}) {
  const [alert, setAlert] = useState(null);
  const parsedAmount = parseFloat(amount);
  const showButton = valuesExist(parsedAmount, toAddress, fromAddress) && (!alert || alert.type !== FAIL);
  const message = showButton
    ? formatMessage(CONFIRM_SEND_TO, { amount, address: toAddress })
    : '';
  const btnLabel = formatMessage(CONFIRM);
  const transactionData = { fromAddress, toAddress, amount: parsedAmount, memo };

  async function onClick() {
    const errors = await validateTransaction(transactionData);

    if (errors) {
      setAlert({
        message: Object.keys(errors)[0],
        type: FAIL,
      });
    } else {
      createTransaction(transactionData).then(transaction => {
        setAlert({
          data: transaction,
          message: SUCCESS,
          type: SUCCESS,
        });
      });
    }
  }

  function AlertComponent() {
    const Component = isMobile
      ? SendFundsMobileAlert
      : SendFundsFlashAlert;

    return (
      <Component
        alert={alert}
        formatMessage={formatMessage}
        setAlert={setAlert}
        resetFields={resetFields}
        toAddress={toAddress}
      />
    );
  }

  if (isMobile) {
    return (
      <SendFundsMobileFooter
        alert={AlertComponent}
        isDisabled={!showButton}
        onClick={onClick}
        label={btnLabel}
      />
    );
  }

  return (
    <div className="send-funds-layout__footer">
      <PageFooter
        alert={AlertComponent}
        message={message}
        button={
          <Visible when={showButton}>
            <Button onClick={onClick} variant={GREEN} size="lg">
              {btnLabel}
            </Button>
          </Visible>
        }
      />
    </div>
  );
}

SendFundsFooter.propTypes = {
  amount: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  formatMessage: PropTypes.func.isRequired,
  fromAddress: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
  toAddress: PropTypes.string.isRequired,
};

export { SendFundsFooter };
