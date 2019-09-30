import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Page } from 'components';

import {
  FromAddressList,
  SendFundsFooter,
  ToAddressList,
  TransferAmount,
} from 'plugins/send-funds/components';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { getToAddress, getFromAddress } from 'plugins/send-funds/rdx/selectors';

import './send-funds.scss';

const initialTransferFields = {
  amount: '',
  memo: '',
};

const SendFundsView = ({
  intl: { formatMessage },
  toAddress,
  fromAddress,
}) => {
  const [transferFields, setTransferFields] = useState(initialTransferFields);

  return (
    <Page
      headerProps={{
        title: formatMessage(SEND_FUNDS.TITLE),
      }}
      contentStyles={{
        height: '100%',
        padding: 0,
      }}
    >
      <div className="send-funds-layout">
        <TransferAmount
          conversionRate={3.14}
          formatMessage={formatMessage}
          setTransferFields={setTransferFields}
          transferFields={transferFields}
        />
        <FromAddressList formatMessage={formatMessage} />
        <ToAddressList formatMessage={formatMessage} />
        <SendFundsFooter
          formatMessage={formatMessage}
          fromAddress={fromAddress}
          toAddress={toAddress}
          transferFields={transferFields}
        />
      </div>
    </Page>
  );
};

SendFundsView.propTypes = {
  fromAddress: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  toAddress: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const toAddress = getToAddress(state);
  const fromAddress = getFromAddress(state);

  return {
    toAddress,
    fromAddress,
  };
};

export const SendFundsPage = connect(mapStateToProps)(injectIntl(SendFundsView));
