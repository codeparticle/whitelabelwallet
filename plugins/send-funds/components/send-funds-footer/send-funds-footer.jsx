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

import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

const { CONFIRM_SEND_TO } = SEND_FUNDS;
const { CONFIRM } = COMMON;
const { GREEN } = VARIANTS;
const notEmpty = obj => typeof obj === 'object' && Object.values(obj).length !== 0;

function SendFundsFooter({
  transferFields,
  formatMessage,
  fromAddress,
  toAddress,
}) {
  const { amount, memo } = transferFields;
  const { address } = toAddress;
  const showButton = amount && notEmpty(fromAddress) && notEmpty(toAddress);
  const message = showButton
    ? formatMessage(CONFIRM_SEND_TO, { amount, address })
    : '';

  function onClick() {
    console.log('amount: ', amount);
    console.log('memo: ', memo);
    console.log('toAddress: ', toAddress);
    console.log('fromAddress: ', fromAddress);
  }

  return (
    <div className="send-funds-layout__footer">
      <PageFooter
        message={message}
        button={
          <Visible when={showButton}>
            <Button onClick={onClick} variant={GREEN} size="lg">
              {formatMessage(CONFIRM)}
            </Button>
          </Visible>
        }
      />
    </div>
  );
}

SendFundsFooter.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  fromAddress: PropTypes.object.isRequired,
  transferFields: PropTypes.object.isRequired,
  toAddress: PropTypes.object.isRequired,
};

export { SendFundsFooter };
