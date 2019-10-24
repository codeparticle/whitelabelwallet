
import React from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import classNames from 'classnames';
import { useMedia } from '@codeparticle/whitelabelwallet.styleguide';
import {
  CustomAmountRenderer,
  CustomWalletRenderer,
  TransactionRow,
} from 'plugins/transaction-history/components';
import { TRANSACTION_HISTORY } from 'plugins/transaction-history/translations/keys';
import { TRANSLATION_KEYS } from 'translations/keys';
import { COMPLETE_STATUS } from 'plugins/transaction-history/helpers';

const { COMMON } = TRANSLATION_KEYS;

const {
  COMPLETE_LABEL,
} = TRANSACTION_HISTORY;

const {
  AMOUNT,
  DATE,
  DESCRIPTION,
  PENDING,
  STATUS,
  SENT_FROM,
  SENT_TO,
  WALLET,
} = COMMON;

function TransactionDetailContent({
  formattedDate,
  formatMessage,
  selectedTransaction,
}) {
  const { isMobile } = useMedia();
  const transactionDetailsClasses = classNames(
    'transaction-detail-content',
    { 'mobile-transaction-detail-content' : isMobile }
  );

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
        {formatMessage(PENDING)}
      </div>
    );
  }

  return (
    <div className={transactionDetailsClasses}>
      <Visible when={isMobile}>
        <TransactionRow
          field={formattedDate}
          label={formatMessage(DATE)}
        />
      </Visible>
      <div className="multi-field-row">
        <TransactionRow label={formatMessage(WALLET)}>
          <CustomWalletRenderer data={selectedTransaction}/>
        </TransactionRow>
        <TransactionRow label={formatMessage(AMOUNT)}>
          <div className="amount-wrapper">
            <CustomAmountRenderer data={selectedTransaction} column={selectedTransaction.amount}/>
          </div>
        </TransactionRow>
      </div>
      <TransactionRow
        field={selectedTransaction.sender_address}
        label={formatMessage(SENT_FROM)}
      />
      <TransactionRow
        field={selectedTransaction.receiver_address}
        label={formatMessage(SENT_TO)}
      />
      <TransactionRow
        field={getStatus(selectedTransaction.status)}
        label={formatMessage(STATUS)}
      />
      <TransactionRow
        field={selectedTransaction.description}
        label={formatMessage(DESCRIPTION)}
      />
    </div>

  );
}

TransactionDetailContent.propTypes = {
  formattedDate: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  selectedTransaction: PropTypes.object.isRequired,
};

TransactionDetailContent.defaultProps = {
  formattedDate: '',
};

export { TransactionDetailContent };