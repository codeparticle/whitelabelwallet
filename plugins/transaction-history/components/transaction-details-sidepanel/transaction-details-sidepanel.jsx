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
import { TransactionDetailContent } from 'plugins/transaction-history/components';
import { TRANSACTION_HISTORY } from 'plugins/transaction-history/translations/keys';
import './transaction-details-sidepanel.scss';

const { SvgSend } = svgs.icons;
const {
  TRANSACTION_DETAILS_TITLE,
  TRANSACTION_DETAILS_BUTTON,
} = TRANSACTION_HISTORY;

const {
  DATE_TIME,
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

  function getContent() {
    if (isMobile) {
      return (
        <ReceiptContainer>
          <TransactionDetailContent
            formattedDate={formattedDate}
            formatMessage={formatMessage}
            selectedTransaction={selectedTransaction}
          />
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