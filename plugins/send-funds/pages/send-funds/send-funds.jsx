import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Page } from 'components';

import {
  FromAddressList,
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
}) => {
  const [transferFields, setTransferFields] = useState(initialTransferFields);

  return (
    <Page
      headerProps={{
        title: formatMessage(SEND_FUNDS.TITLE),
      }}
      removePadding
    >
      <div className="send-funds-layout">
        <div className="send-funds-layout__transfer-amount">
          <TransferAmount
            conversionRate={3.14}
            formatMessage={formatMessage}
            setTransferFields={setTransferFields}
            transferFields={transferFields}
          />
        </div>
        <div className="send-funds-layout__from-address">
          <FromAddressList formatMessage={formatMessage} />
        </div>
        <div className="send-funds-layout__to-address">
          <ToAddressList formatMessage={formatMessage} />
        </div>
        <div className="send-funds-layout__footer"></div>
      </div>
    </Page>
  );
};

SendFundsView.propTypes = {
  toAddress: PropTypes.object.isRequired,
  fromAddress: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
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
