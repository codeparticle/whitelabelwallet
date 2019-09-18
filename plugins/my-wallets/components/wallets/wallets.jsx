import React from 'react';
import PropTypes from 'prop-types';
import {
  Wallet,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { injectIntl, intlShape } from 'react-intl';
import { empty } from 'lib/utils';

import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { ROUTES } from 'plugins/my-wallets/helpers';

import './wallets.scss';

const { PLUGIN, OVERVIEW } = ROUTES;
const { SvgCoinSymbol } = svgs.icons;

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
const WalletsView = ({
  history,
  intl: {
    formatMessage,
  },
  wallets,
}) => {
  const coinSymbol = <SvgCoinSymbol height="24" width="24" />;

  const commonProps = {
    currencySymbol: <span>&#36;</span>,
    coinSymbol,
    messages: {
      deposit: formatMessage(MY_WALLETS.RECEIVE_FUNDS_BUTTON_LABEL),
      withdraw: formatMessage(MY_WALLETS.SEND_FUNDS_BUTTON_LABEL),
    },
  };

  const onDeposit = empty;
  const onWithdraw = empty;

  function onWalletClickHandler({ id }) {
    history.push(`${PLUGIN}/${id}/${OVERVIEW}`);
  }

  return (
    <div className="wallets-rct-component">
      {wallets.map((wallet) => {
        const onClick = () => onWalletClickHandler(wallet);

        return (
          <div key={wallet.id} className="wallets-rct-component__wallet-container">
            <Wallet
              {...commonProps}
              onDeposit={onDeposit}
              onClick={onClick}
              onWithdraw={onWithdraw}
              title={wallet.name}
            />
          </div>
        );
      })}
    </div>
  );
};

WalletsView.propTypes = {
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  wallets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    coinBalance: PropTypes.number,
    coinData: PropTypes.arrayOf(PropTypes.object),
  })),
};

WalletsView.defaultProps = {
  wallets: [],
};

const Wallets = injectIntl(WalletsView);

export { Wallets };
