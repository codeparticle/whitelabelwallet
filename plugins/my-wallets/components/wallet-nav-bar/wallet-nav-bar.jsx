/**
 * @fileoverview Wallet Nav Bar Component
 * @author Marc Mathieu
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';

import { preSelectFromAddress } from 'plugins/send-funds/rdx/actions';

import { getWalletAddressesById, ROUTES } from 'plugins/my-wallets/helpers';
import { WalletNavBarButton } from 'plugins/my-wallets/components';
import { setFromAddress } from 'plugins/send-funds/rdx/actions';
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

const SVG_SIZE = '44px';

function WalletNavBarView({
  selectedWallet,
  formatMessage,
  history,
  match,
  ...props
}) {
  async function setFromAddress(wallet) {
    const walletAddress = await getWalletAddressesById(wallet.id);
    props.preSelectFromAddress({
      id: walletAddress.id,
      data: walletAddress,
    });
  }

  const onTransactionClick = () => {
    const url = `${PLUGIN}/${selectedWallet.id}/${OVERVIEW}`;
    if (`/${url}` !== match.url) {
      history.push(url);
    }
  };

  const onReceiveClick = () => {
    setFromAddress(selectedWallet).then(() => {
      history.push(`/${PLUGIN}/${selectedWallet.id}/${RECEIVE_FUNDS}`);
    });
  };

  const onSendClick = () => {
    setFromAddress(selectedWallet).then(() => {
      history.push(`/${PLUGIN}/${selectedWallet.id}/${SEND_FUNDS}`);
    });
  };

  return (
    <div className="wallet-nav-bar">
      <div className="wallet-nav-item">
        <WalletNavBarButton
          icon={<SvgTransactionHistory height={SVG_SIZE} width={SVG_SIZE}/>}
          categoryLabel={formatMessage(TRANSACTIONS)}
          onClick={onTransactionClick}
        />
      </div>
      <div className="wallet-nav-item">
        <WalletNavBarButton
          icon={<SvgSend height={SVG_SIZE} width={SVG_SIZE}/>}
          categoryLabel={formatMessage(SEND)}
          onClick={onSendClick}
        />
      </div>
      <div className="wallet-nav-item">
        <WalletNavBarButton
          icon={<SvgReceive height={SVG_SIZE} width={SVG_SIZE}/>}
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
  preSelectFromAddress: PropTypes.func.isRequired,
  selectedWallet: PropTypes.object.isRequired,
  setFromAddress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  preSelectFromAddress,
  setFromAddress,
};

const WalletNavBar = connect(null, mapDispatchToProps)(withRouter(WalletNavBarView));

export { WalletNavBar };
