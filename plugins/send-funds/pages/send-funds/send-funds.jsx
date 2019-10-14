import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectIntl, intlShape } from 'react-intl';
import { Page } from 'components';
import { Visible } from '@codeparticle/react-visible';
import { THEME_KEYS, useMedia, useTheme } from '@codeparticle/whitelabelwallet.styleguide';
import { cloud } from '@codeparticle/whitelabelwallet.styleguide/styles/colors';
import { VARIANTS } from 'lib/constants';

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

const { SECONDARY } = VARIANTS;

const SendFundsView = ({
  intl: { formatMessage },
  toAddress,
  fromAddress,
  match,
}) => {
  const [transferFields, setTransferFields] = useState(initialTransferFields);
  const themeName = useTheme('name');
  const { isMobile } = useMedia();
  const mobileBackground = themeName === THEME_KEYS.LIGHT
    ? cloud
    : null;

  function getHeaderProps() {
    const headerProps = {
      title: formatMessage(SEND_FUNDS.TITLE),
    };

    match.params.address
      ? headerProps['type'] = SECONDARY
      : null;

    return headerProps;
  }



  return (
    <Page
      background={isMobile ? mobileBackground : null}
      headerProps={getHeaderProps()}
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
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const toAddress = getToAddress(state);
  const fromAddress = getFromAddress(state);

  return {
    toAddress,
    fromAddress,
  };
};

export const SendFundsPage = connect(mapStateToProps)(injectIntl(withRouter(SendFundsView)));
