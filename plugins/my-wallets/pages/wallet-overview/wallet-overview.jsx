/**
 * @fileoverview Wallet overview page
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Button, ButtonVariants } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { Page } from 'components';
import { useManager } from 'lib/hooks';

import { setSelectedWallet } from 'plugins/my-wallets/rdx/actions';
import { ManageWalletSidepanel }  from 'plugins/my-wallets/components';
import { getSelectedWallet } from 'plugins/my-wallets/rdx/selectors';
import { getWalletById, ROUTES } from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';

const { MANAGE_WALLET_BUTTON_LABEL } = MY_WALLETS;
const { PLUGIN } = ROUTES;
const { SECONDARY } = VARIANTS;
const { SLATE_CLEAR } = ButtonVariants;

function WalletOverviewView({
  intl: {
    formatMessage,
  },
  match,
  selectedWallet,
  ...props
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { name } = selectedWallet;
  const { walletId } = match.params;
  const manager = useManager();

  useEffect(() => {
    getWalletById(manager, props.setSelectedWallet, walletId);
  }, [setSelectedWallet]);

  const toggleSidePanel = () => setIsPanelOpen(!isPanelOpen);

  function ManageButton() {
    return (
      <Button
        onClick={toggleSidePanel}
        size="sm"
        variant={SLATE_CLEAR}
      >
        {formatMessage(MANAGE_WALLET_BUTTON_LABEL)}
      </Button>
    );
  }

  return (
    <Page
      headerProps={{
        PrimaryAction: ManageButton,
        title: name || '',
        to: `/${PLUGIN}`,
        type: SECONDARY,
      }}
    >
      <ManageWalletSidepanel
        formatMessage={formatMessage}
        isOpen={isPanelOpen}
        manager={manager}
        onClose={toggleSidePanel}
        setSelectedWallet={props.setSelectedWallet}
        wallet={selectedWallet}
      />
    </Page>
  );
}

WalletOverviewView.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  selectedWallet: PropTypes.object,
  setSelectedWallet: PropTypes.func.isRequired,
};

WalletOverviewView.defaultProps = {
  selectedWallet: {},
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

export const WalletOverviewPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletOverviewView));
