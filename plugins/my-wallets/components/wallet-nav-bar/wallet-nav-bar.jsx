/**
 * @fileoverview Wallet Nav Bar Component
 * @author Marc Mathieu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';
import { ROUTES } from 'plugins/my-wallets/helpers';
import { WalletNavBarButton } from 'plugins/my-wallets/components';
import './wallet-nav-bar.scss';

const { RECEIVE, SEND, TRANSACTIONS } = TRANSLATION_KEYS.COMMON;
const {
  PLUGIN,
  OVERVIEW,
  RECEIVE_FUNDS,
  SEND_FUNDS,
} = ROUTES;

const {
  SvgTransactionHistory,
  SvgReceive,
  SvgSend,
} = svgs.icons;

function WalletNavBarView({
  selectedWallet,
  selectedAddress,
  formatMessage,
  history,
  match,
}) {
  const onTransactionClick = () => {
    const url = `${PLUGIN}/${selectedWallet.id}/${OVERVIEW}`;
    if (`/${url}` !== match.url) {
      history.push(url);
    }
  };

  const onReceiveClick = () => {
    history.push(`/${PLUGIN}/${selectedWallet.id}/${RECEIVE_FUNDS}/${selectedAddress.address}`);
  };
  const onSendClick = () => {
    history.push(`/${PLUGIN}/${selectedWallet.id}/${SEND_FUNDS}/${selectedAddress.address}`);
  };
  return (
    <div className="wallet-nav-bar">
      <div className="wallet-nav-item">
        <WalletNavBarButton
          icon={<SvgTransactionHistory height="44px" width="44px"/>}
          categoryLabel={formatMessage(TRANSACTIONS)}
          onClick={onTransactionClick}
        />
      </div>
      <div className="wallet-nav-item">
        <WalletNavBarButton
          icon={<SvgSend height="44px" width="44px"/>}
          categoryLabel={formatMessage(SEND)}
          onClick={onSendClick}
        />
      </div>
      <div className="wallet-nav-item">
        <WalletNavBarButton
          icon={<SvgReceive height="44px" width="44px"/>}
          categoryLabel={formatMessage(RECEIVE)}
          onClick={onReceiveClick}
        />
      </div>
    </div>
  );
}

WalletNavBarView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  selectedWallet: PropTypes.object.isRequired,
  selectedAddress: PropTypes.object,
};

WalletNavBarView.defaultProps = {
  selectedAddress: {},
};

const WalletNavBar = withRouter(WalletNavBarView);

export { WalletNavBar };
