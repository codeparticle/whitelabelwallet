import React from 'react';
import PropTypes from 'prop-types';
import {
  Wallet,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';
import { empty } from 'lib/utils';
import './wallets.scss';

const { SvgCoinSymbol } = svgs.icons;

const { WALLETS } = TRANSLATION_KEYS;

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
  @typedef WalletsProps
  @type {Object}
  @property {Object} intl
  @property {Array} wallets - wallets to render
*/

/**
  Renders Wallets
  @param {WalletsProps} props
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
  wallets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    coinBalance: PropTypes.number,
    coinData: PropTypes.arrayOf(PropTypes.object),
  })),
  formatMessage: PropTypes.func.isRequired,
};

Wallets.defaultProps = {
  wallets: [],
};

export { Wallets };
