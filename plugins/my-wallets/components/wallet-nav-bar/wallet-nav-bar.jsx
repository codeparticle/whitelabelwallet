/**
 * @fileoverview Wallet Nav Bar Component
 * @author Marc Mathieu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  IconButton,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';
import { ROUTES } from 'plugins/my-wallets/helpers';
import './wallet-nav-bar.scss';

const { RECEIVE, SEND, TRANSACTIONS } = TRANSLATION_KEYS.COMMON;
const {
  PLUGIN,
  OVERVIEW,
  RECEIVE_FUNDS,
} = ROUTES;

const {
  SvgTransactionHistory,
  SvgReceive,
  SvgSend,
} = svgs.icons;

function WalletNavBarView({
  selectedWallet,
  dataSelector,
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
    console.log('========\n', 'RECEIVE_FUNDS', RECEIVE_FUNDS, '\n========');
    history.push(`/${RECEIVE_FUNDS}`);
  };
  const onClick = () => console.log('clicked');
  return (
    <div className="wallet-nav-bar">
      <div className="wallet-nav-item">
        <IconButton
          dataSelector={dataSelector}
          onClick={onTransactionClick}
          icon={<SvgTransactionHistory height="44px" width="44px"/>}
        />
        <div className="category-wrapper">
          <p className="nav-item-category">{formatMessage(TRANSACTIONS)}</p>
        </div>
      </div>
      <div className="wallet-nav-item">
        <IconButton
          dataSelector={dataSelector}
          onClick={onClick}
          icon={<SvgSend height="44px" width="44px"/>}
        />
        <div className="category-wrapper">
          <p className="nav-item-category">{formatMessage(SEND)}</p>
        </div>
      </div>
      <div className="wallet-nav-item">
        <IconButton
          dataSelector={dataSelector}
          onClick={onReceiveClick}
          icon={<SvgReceive height="44px" width="44px"/>}
        />
        <div className="category-wrapper">
          <p className="nav-item-category">{formatMessage(RECEIVE)}</p>
        </div>
      </div>
    </div>
  );
}

WalletNavBarView.propTypes = {
  dataSelector: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  selectedWallet: PropTypes.object.isRequired,
};

WalletNavBarView.defaultProps = {
  dataSelector: '',
};

const WalletNavBar = withRouter(WalletNavBarView);

export { WalletNavBar };
