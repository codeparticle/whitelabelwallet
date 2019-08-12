import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import {
  Wallet,
  Button,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';
import { empty } from 'lib/utils';
import './wallets.scss';

const { SvgCoinSymbol } = svgs.icons;

const { WALLETS } = TRANSLATION_KEYS;

const {
  arrayOf,
  shape,
  oneOfType,
  object,
  func,
  string,
  number,
} = PropTypes;

/**
  Renders Wallets
  @param {Array} wallets - wallets to render
  @param {Object} commonProps - common props for Wallet Component
  @returns {Node} - rendered Wallets
*/
const renderWallets = (wallets, commonProps) => {
  return wallets.map(wallet => {
    const walletProps = {
      ...wallet,
      ...commonProps,
      onDeposit: empty,
      onWithdraw: empty,
    };
    return (
      <div key={wallet.id} className="wallets-rct-component__wallet-container">
        <Wallet {...walletProps} />
      </div>
    );
  });
};

/**
  Renders Wallets
  @param {Array} $0.wallets - wallets to render
  @param {Array} $0.formatMessage - intl function
  @returns {Node} - rendered Wallets
*/
const Wallets = ({ wallets, formatMessage }) => {
  const coinSymbol = <SvgCoinSymbol height="24" width="24" />;

  const commonProps = {
      currencySymbol: <span>&#36;</span>,
      coinSymbol,
      messages: {
        deposit: formatMessage(WALLETS.RECEIVE_FUNDS_BUTTON_LABEL),
        withdraw: formatMessage(WALLETS.SEND_FUNDS_BUTTON_LABEL),
      },
  };

  return (
    <div className="wallets-rct-component">
      {renderWallets(wallets, commonProps)}
    </div>
  );
};

Wallets.propTypes = {
  wallets: arrayOf(shape({
    id: oneOfType([string, number]),
    title: string,
    coinBalance: number,
    coinData: arrayOf(object),
  })),
  formatMessage: func.isRequired,
};

Wallets.defaultProps = {
  wallets: [],
};

export { Wallets };
