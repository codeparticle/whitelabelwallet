import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Page } from 'components';
import { Visible } from '@codeparticle/react-visible';
import { THEME_KEYS, useMedia, useTheme } from '@codeparticle/whitelabelwallet.styleguide';
import { cloud } from '@codeparticle/whitelabelwallet.styleguide/styles/colors';

import {
  FromAddressList,
  SendFundsFooter,
  SendFundsMobileForm,
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
  const themeName = useTheme('name');
  const { isMobile } = useMedia();
  const mobileBackground = themeName === THEME_KEYS.LIGHT
    ? cloud
    : null;

  return (
    <Page
      background={isMobile ? mobileBackground : null}
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
          isMobile={isMobile}
          setTransferFields={setTransferFields}
          transferFields={transferFields}
        />
        <Visible when={!isMobile}>
          <FromAddressList formatMessage={formatMessage} />
          <ToAddressList formatMessage={formatMessage} />
        </Visible>
        <Visible when={isMobile}>
          <SendFundsMobileForm
            formatMessage={formatMessage}
            setTransferFields={setTransferFields}
            transferFields={transferFields}
          />
        </Visible>
        <SendFundsFooter
          isMobile={isMobile}
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
  fromAddress: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  toAddress: PropTypes.string.isRequired,
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
