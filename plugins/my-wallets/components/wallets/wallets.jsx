import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Wallet,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { injectIntl, intlShape } from 'react-intl';
import { empty } from 'lib/utils';

import { setSelectedWallet } from 'plugins/my-wallets/rdx/actions';
import { getSelectedWallet } from 'plugins/my-wallets/rdx/selectors';
import { ManageWalletSidepanel }  from 'plugins/my-wallets/components';
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
  handleWalletClick,
  history,
  intl: {
    formatMessage,
  },
  wallets,
  selectedWallet,
  ...props
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
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
    handleWalletClick();
    history.push(`${PLUGIN}/${id}/${OVERVIEW}`);
  }

  function onEditWalletClickHandler(event, wallet) {
    props.setSelectedWallet(wallet);
    setIsPanelOpen(!isPanelOpen);
  }

  function onClose() {
    setIsPanelOpen(false);
  }

  return (
    <div className="wallets-rct-component">
      {wallets.map((wallet) => {
        const onClick = () => onWalletClickHandler(wallet);
        const onEdit = (event) => onEditWalletClickHandler(event, wallet);

        return (
          <div key={wallet.id} className="wallets-rct-component__wallet-container">
            <Wallet
              {...commonProps}
              onDeposit={onDeposit}
              onClick={onClick}
              onEdit={onEdit}
              onWithdraw={onWithdraw}
              title={wallet.name}
            />
          </div>
        );
      })}
      <ManageWalletSidepanel
        formatMessage={formatMessage}
        isOpen={isPanelOpen}
        onClose={onClose}
        setSelectedWallet={props.setSelectedWallet}
        wallet={selectedWallet}
      />
    </div>
  );
};

WalletsView.propTypes = {
  handleWalletClick: PropTypes.func.isRequired,
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

const mapStateToProps = (state) => {
  const selectedWallet = getSelectedWallet(state);

  return {
    selectedWallet,
  };
};



const mapDispatchToProps = {
  setSelectedWallet,
};

const Wallets = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletsView));

export { Wallets };
