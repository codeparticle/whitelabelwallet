import React from 'react';
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
import { resetFields, setAmount, setMemo } from 'plugins/send-funds/rdx/actions';
import {
  getAmount,
  getFromAddress,
  getMemo,
  getToAddress,
} from 'plugins/send-funds/rdx/selectors';

import './send-funds.scss';

const { SECONDARY } = VARIANTS;

const SendFundsView = ({
  amount,
  intl: { formatMessage },
  memo,
  toAddress,
  fromAddress,
  match,
  ...props
}) => {
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
          amount={amount}
          memo={memo}
          setAmount={props.setAmount}
          setMemo={props.setMemo}
        />
        <Visible when={!isMobile}>
          <FromAddressList formatMessage={formatMessage} />
          <ToAddressList formatMessage={formatMessage} />
        </Visible>
        <Visible when={isMobile}>
          <SendFundsMobileForm
            formatMessage={formatMessage}
            setAmount={props.setAmount}
            setMemo={props.setMemo}
            amount={amount}
            memo={memo}
          />
        </Visible>
        <SendFundsFooter
          amount={amount}
          formatMessage={formatMessage}
          fromAddress={fromAddress}
          isMobile={isMobile}
          memo={memo}
          resetFields={props.resetFields}
          toAddress={toAddress}
        />
      </div>
    </Page>
  );
};

SendFundsView.propTypes = {
  fromAddress: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  setAmount: PropTypes.func.isRequired,
  setMemo: PropTypes.func.isRequired,
  toAddress: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  setAmount,
  setMemo,
  resetFields,
};

const mapStateToProps = state => {
  const amount = getAmount(state);
  const fromAddress = getFromAddress(state);
  const memo = getMemo(state);
  const toAddress = getToAddress(state);

  return {
    amount,
    fromAddress,
    memo,
    toAddress,
  };
};

export const SendFundsPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(SendFundsView)));
