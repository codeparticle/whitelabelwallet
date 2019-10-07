/**
 * @fileoverview Wallet Nav Bar Component
 * @author Marc Mathieu
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import './wallet-nav-bar.scss';
import { TRANSLATION_KEYS } from 'translations/keys';

const { RECEIVE, SEND, TRANSACTIONS } = TRANSLATION_KEYS.COMMON;

const {
  SvgTransactionHistory,
  SvgReceive,
  SvgSend,
} = svgs.icons;

function WalletNavBar({ selectedWallet, dataSelector, formatMessage }) {
  const onClick = () => console.log(selectedWallet);

  return (
    <div className="wallet-nav-bar">
      <div className="wallet-nav-item">
        <IconButton
          dataSelector={dataSelector}
          onClick={onClick}
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
          onClick={onClick}
          icon={<SvgReceive height="44px" width="44px"/>}
        />
        <div className="category-wrapper">
          <p className="nav-item-category">{formatMessage(RECEIVE)}</p>
        </div>
      </div>
    </div>
  );
}

WalletNavBar.propTypes = {
  dataSelector: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  selectedWallet: PropTypes.object.isRequired,
};

WalletNavBar.defaultProps = {
  dataSelector: '',
};

export { WalletNavBar };
