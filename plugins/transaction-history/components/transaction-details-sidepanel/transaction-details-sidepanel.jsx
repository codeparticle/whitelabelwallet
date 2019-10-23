import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  ReceiptContainer,
  Overlay,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getSidepanelVariant } from 'lib/utils';
import { CustomAmountRenderer, CustomWalletRenderer, TransactionDetailContent, TransactionRow } from 'plugins/transaction-history/components';
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


  function getContent() {
    if (isMobile) {
      return (
        <ReceiptContainer>
          <TransactionDetailContent formatMessage={formatMessage} selectedTransaction={selectedTransaction} />
        </ReceiptContainer>
      );
    }

    return <TransactionDetailContent formatMessage={formatMessage} selectedTransaction={selectedTransaction} />;
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
      {/* <div className="transaction-detail-content">
        <div className="row">
          <div className="field">
            <label>{formatMessage(WALLET_LABEL)}</label>
            <CustomWalletRenderer data={selectedTransaction}/>
          </TransactionRow>
          <TransactionRow label={formatMessage(AMOUNT)}>
            <div className="amount-wrapper">
              <CustomAmountRenderer data={selectedTransaction} column={selectedTransaction.amount}/>
            </div>
          </TransactionRow>
        </div>
      </div> */}
      {getContent()}
    </Overlay>
  );
}

TransactionDetailsSidepanel.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { TransactionDetailsSidepanel };