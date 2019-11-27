/**
 * @fileoverview TransferAmount component for send funds
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyAmount, TransferAmount as TransferAmountComponent } from '@codeparticle/whitelabelwallet.styleguide';

import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
const {
  FEE_MESSAGE,
  MEMO,
  TRANSACTION_FEE,
  TRANSFER_AMOUNT,
} = SEND_FUNDS;

const getComponent = isMobile => isMobile ? CurrencyAmount : TransferAmountComponent;

export function TransferAmount({
  amount,
  coinDecimalLimit,
  conversionRate,
  fee,
  formatMessage,
  isMobile,
  memo,
  setAmount,
  setFee,
  setMemo,
  tickerSymbol,
}) {
  const Component = getComponent(isMobile);
  const translations = {
    fee: formatMessage(TRANSACTION_FEE),
    feeMessage: formatMessage(FEE_MESSAGE),
    header: formatMessage(TRANSFER_AMOUNT),
    memo: formatMessage(MEMO),
  };

  const onValueChange = fn => e => fn(e.target.value);

  return (
    <div className="send-funds-layout__transfer-amount">
      <Component
        coinDecimalLimit={coinDecimalLimit}
        conversionRate={conversionRate}
        currencyValue={amount}
        feeValue={fee}
        memoValue={memo}
        handleCurrencyChange={onValueChange(setAmount)}
        handleFeeChange={onValueChange(setFee)}
        handleMemoChange={onValueChange(setMemo)}
        tickerSymbol={tickerSymbol}
        translations={translations}
      />
    </div>
  );
}

TransferAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  coinDecimalLimit: PropTypes.number,
  conversionRate: PropTypes.number.isRequired,
  fee: PropTypes.string.isRequired,
  formatMessage: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  memo: PropTypes.string.isRequired,
  setAmount: PropTypes.func.isRequired,
  setFee: PropTypes.func.isRequired,
  setMemo: PropTypes.func.isRequired,
  tickerSymbol: PropTypes.string,
};

TransferAmount.defaultProps = {
  coinDecimalLimit: 8,
  tickerSymbol: '',
};
