import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectIntl, intlShape } from 'react-intl';
import { Page } from 'components';
import { Visible } from '@codeparticle/react-visible';
import { THEME_KEYS, useMedia, useTheme } from '@codeparticle/whitelabelwallet.styleguide';
import { cloud } from '@codeparticle/whitelabelwallet.styleguide/styles/colors';
import { VARIANTS } from 'lib/constants';
import { getFiatAmount } from 'lib/utils';
import { useUnmount } from 'lib/hooks';

import {
  FromAddressList,
  SendFundsFooter,
  SendFundsMobileForm,
  ToAddressList,
  TransferAmount,
} from 'plugins/send-funds/components';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { resetFields, setAmount, setFee, setMemo } from 'plugins/send-funds/rdx/actions';
import {
  getAmount,
  getFiat,
  getFee,
  getFromAddress,
  getMemo,
  getToAddress,
} from 'plugins/send-funds/rdx/selectors';

import './send-funds.scss';

const { SECONDARY } = VARIANTS;

const SendFundsView = ({
  amount,
  fiat,
  fee,
  intl: { formatMessage },
  memo,
  toAddress,
  fromAddress,
  match,
  ...props
}) => {
  const [fiatConversionRate, setFiatConversionRate] = useState(0);
  const themeName = useTheme('name');
  const { isMobile } = useMedia();
  const [headerProps, setHeaderProps] = useState(null);
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

  const getFiatConversionRate = useCallback(async () => {
    setFiatConversionRate((await getFiatAmount(0, fiat)).rate);
  }, [amount]);

  useEffect(() => {
    getFiatConversionRate();
  }, [getFiatConversionRate]);

  function updateHeaderProps(values) {
    if (values) {
      setHeaderProps({
        ...getHeaderProps(),
        ...values,
      });
    } else {
      setHeaderProps(getHeaderProps());
    }
  }

  useUnmount(props.resetFields);

  return (
    <Page
      background={isMobile ? mobileBackground : null}
      headerProps={headerProps || getHeaderProps()}
      contentStyles={{
        height: '100%',
        padding: 0,
      }}
    >
      <div className="send-funds-layout">
        <TransferAmount
          conversionRate={fiatConversionRate}
          formatMessage={formatMessage}
          isMobile={isMobile}
          amount={amount}
          memo={memo}
          fee={fee}
          setAmount={props.setAmount}
          setFee={props.setFee}
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
            updateHeaderProps={updateHeaderProps}
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
  fiat: PropTypes.string.isRequired,
  fromAddress: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  setAmount: PropTypes.func.isRequired,
  setFee: PropTypes.func.isRequired,
  setMemo: PropTypes.func.isRequired,
  toAddress: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  setAmount,
  setFee,
  setMemo,
  resetFields,
};

const mapStateToProps = state => {
  const amount = getAmount(state);
  const fiat = getFiat(state);
  const fee = getFee(state);
  const fromAddress = getFromAddress(state);
  const memo = getMemo(state);
  const toAddress = getToAddress(state);

  return {
    amount,
    fiat,
    fee,
    fromAddress,
    memo,
    toAddress,
  };
};

export const SendFundsPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(SendFundsView)));
