
import React from 'react';
import PropTypes from 'prop-types';
import { CustomAmountRenderer, CustomWalletRenderer } from 'plugins/transaction-history/components';
import { TRANSACTION_HISTORY } from 'plugins/transaction-history/translations/keys';
import { COMPLETE_STATUS } from 'plugins/transaction-history/helpers';

const {
  AMOUNT_LABEL,
  COMPLETE_LABEL,
  DESCRIPTION_LABEL,
  PENDING_LABEL,
  SENT_FROM_LABEL,
  SENT_TO_LABEL,
  STATUS_LABEL,
  WALLET_LABEL,
} = TRANSACTION_HISTORY;

function TransactionDetailContent({
  formatMessage,
  selectedTransaction,
}) {

  function getStatus(status = null) {
    if (status === COMPLETE_STATUS) {
      return (
        <div className="complete">
          {formatMessage(COMPLETE_LABEL)}
        </div>
      );
    }

    return (
      <div className="pending">
        {formatMessage(PENDING_LABEL)}
      </div>
    );
  }

  return (
    <div className="transaction-detail-content">
      <div className="row">
        <div className="field">
          <label>{formatMessage(WALLET_LABEL)}</label>
          <CustomWalletRenderer data={selectedTransaction}/>
        </div>
        <div className="field">
          <label>{formatMessage(AMOUNT_LABEL)}</label>
          <div className="amount-wrapper">
            <CustomAmountRenderer data={selectedTransaction} column={selectedTransaction.amount}/>
          </div>
        </div>
      </div>
      <div className="row">
        <label>{formatMessage(SENT_FROM_LABEL)}</label>
        <div className="field">{selectedTransaction.sender_address}</div>
      </div>
      <div className="row">
        <label>{formatMessage(SENT_TO_LABEL)}</label>
        <div className="field">{selectedTransaction.receiver_address}</div>
      </div>
      <div className="row">
        <label>{formatMessage(STATUS_LABEL)}</label>
        <div className="field">{getStatus(selectedTransaction.status)}</div>
      </div>
      <div className="row">
        <label>{formatMessage(DESCRIPTION_LABEL)}</label>
        <div className="field">{selectedTransaction.description}</div>
      </div>
    </div>

  );
}

TransactionDetailContent.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { TransactionDetailContent };