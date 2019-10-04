/**
 * @fileoverview TransferAmount component for send funds
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyAmount, TransferAmount as TransferAmountComponent } from '@codeparticle/whitelabelwallet.styleguide';

import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
const {
  MEMO,
  TRANSFER_AMOUNT,
} = SEND_FUNDS;

const MEMO_FIELD = 'memo';
const AMOUNT_FIELD = 'amount';

const getComponent = isMobile => isMobile ? CurrencyAmount : TransferAmountComponent;

export function TransferAmount({
  coinDecimalLimit,
  conversionRate,
  formatMessage,
  isMobile,
  transferFields,
  setTransferFields,
  tickerSymbol,
}) {
  const Component = getComponent(isMobile);
  const translations = {
    header: formatMessage(TRANSFER_AMOUNT),
    memo: formatMessage(MEMO),
  };

  const onValueChange = field => e => setTransferFields({
    ...transferFields,
    [field]: e.target.value,
  });

  return (
    <div className="send-funds-layout__transfer-amount">
      <Component
        coinDecimalLimit={coinDecimalLimit}
        conversionRate={conversionRate}
        memoValue={transferFields.memo}
        handleMemoChange={onValueChange(MEMO_FIELD)}
        handleCurrencyChange={onValueChange(AMOUNT_FIELD)}
        tickerSymbol={tickerSymbol}
        translations={translations}
      />
    </div>
  );
}

TransferAmount.propTypes = {
  coinDecimalLimit: PropTypes.number,
  conversionRate: PropTypes.number.isRequired,
  formatMessage: PropTypes.func.isRequired,
  transferFields: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  setTransferFields: PropTypes.func.isRequired,
  tickerSymbol: PropTypes.string,
};

TransferAmount.defaultProps = {
  coinDecimalLimit: 4,
  tickerSymbol: '',
};
