/**
 * @fileoverview Footer for send funds page
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { Button, PageFooter } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { COMMON } from 'translations/keys/common';

import { SendFundsMobileFooter } from 'plugins/send-funds/components';
import { createTransaction, valuesExist } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const { CONFIRM_SEND_TO } = SEND_FUNDS;
const { CONFIRM } = COMMON;
const { GREEN } = VARIANTS;

function SendFundsFooter({
  isMobile,
  transferFields,
  formatMessage,
  fromAddress,
  toAddress,
}) {
  const { amount, memo } = transferFields;
  const parsedAmount = parseFloat(amount);
  const showButton = valuesExist(parsedAmount, toAddress, fromAddress);
  const message = showButton
    ? formatMessage(CONFIRM_SEND_TO, { amount, address: toAddress })
    : '';
  const btnLabel = formatMessage(CONFIRM);

  function onClick() {
    createTransaction({ fromAddress, toAddress, amount: parsedAmount, memo });
  }

  if (isMobile) {
    return (
      <SendFundsMobileFooter
        isDisabled={!showButton}
        onClick={onClick}
        label={btnLabel}
      />
    );
  }

  return (
    <div className="send-funds-layout__footer">
      <PageFooter
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
  isMobile: PropTypes.bool.isRequired,
  formatMessage: PropTypes.func.isRequired,
  fromAddress: PropTypes.string.isRequired,
  transferFields: PropTypes.object.isRequired,
  toAddress: PropTypes.string.isRequired,
};

export { SendFundsFooter };
