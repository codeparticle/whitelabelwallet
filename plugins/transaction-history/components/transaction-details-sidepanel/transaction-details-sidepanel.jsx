import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Overlay,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getSidepanelVariant } from 'lib/utils';
import { CustomAmountRenderer, CustomWalletRenderer, TransactionRow } from 'plugins/transaction-history/components';
import { TRANSACTION_HISTORY } from 'plugins/transaction-history/translations/keys';
import { TRANSLATION_KEYS } from 'translations/keys';
import { COMPLETE_STATUS } from 'plugins/transaction-history/helpers';
import './transaction-details-sidepanel.scss';

const { COMMON } = TRANSLATION_KEYS;
const { SvgSend } = svgs.icons;
const {
  COMPLETE_LABEL,
  TRANSACTION_DETAILS_TITLE,
  TRANSACTION_DETAILS_BUTTON,
} = TRANSACTION_HISTORY;

const {
  AMOUNT,
  DATE_TIME,
  DESCRIPTION,
  PENDING,
  STATUS,
  SENT_FROM,
  SENT_TO,
  WALLET,
} = COMMON;

function TransactionDetailsSidepanel({
  formatMessage,
  isOpen,
  onClose,
  selectedTransaction,
}) {
  const { isMobile } = useMedia();
  const panelVariant = getSidepanelVariant({ isMobile });
  const formattedDate = formatMessage(DATE_TIME, {
    date: moment(selectedTransaction.created_date).format('MM/DD/YY'),
    time: moment(selectedTransaction.created_date).format('h:mm a'),
  });

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
    <Overlay
      Icon={SvgSend}
      isOpen={isOpen}
      hasCancelButton={false}
      footerButtonText={formatMessage(TRANSACTION_DETAILS_BUTTON)}
      onClick={onClose}
      onClose={onClose}
      title={formatMessage(TRANSACTION_DETAILS_TITLE)}
      subTitle={formattedDate}
      type={panelVariant}
    >
      <div className="transaction-detail-content">
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
    </Overlay>
  );
}

TransactionDetailsSidepanel.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { TransactionDetailsSidepanel };