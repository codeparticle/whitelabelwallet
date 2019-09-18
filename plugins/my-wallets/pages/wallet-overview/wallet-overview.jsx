/**
 * @fileoverview Wallet overview page
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import {
  Button,
  ButtonVariants,
  IconButton,
  IconVariants,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { Page } from 'components';

import { setSelectedWallet } from 'plugins/my-wallets/rdx/actions';
import { ManageWalletSidepanel }  from 'plugins/my-wallets/components';
import { getSelectedWallet } from 'plugins/my-wallets/rdx/selectors';
import { getWalletById, ROUTES } from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';

const { SvgPencil } = svgs.icons;
const { MANAGE_WALLET_BUTTON_LABEL } = MY_WALLETS;
const { PLUGIN } = ROUTES;
const { SECONDARY } = VARIANTS;
const { SLATE } = IconVariants;
const { SLATE_CLEAR } = ButtonVariants;

function ManageButton({ buttonVariant, label, onClick, size }) {
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={buttonVariant}
    >
      {label}
    </Button>
  );
}

function ManageIcon({ iconVariant, iconProps, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      variant={iconVariant}
      icon={<SvgPencil {...iconProps} />}
    />
  );
}

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

  useEffect(() => {
    getWalletById(walletId, props.setSelectedWallet);
  }, [setSelectedWallet]);

  const toggleSidePanel = () => setIsPanelOpen(!isPanelOpen);

  function PrimaryAction({ collapsed, iconProps }) {
    const buttonProps = {
      buttonVariant: SLATE_CLEAR,
      iconProps,
      iconVariant: SLATE,
      label: formatMessage(MANAGE_WALLET_BUTTON_LABEL),
      onClick: toggleSidePanel,
      size: 'sm',
    };

    return (
      <Visible when={!collapsed} fallback={<ManageIcon {...buttonProps} />}>
        <ManageButton {...buttonProps} />
      </Visible>
    );
  }

  return (
    <Page
      headerProps={{
        PrimaryAction,
        title: name || '',
        to: `/${PLUGIN}`,
        type: SECONDARY,
      }}
    >
      <ManageWalletSidepanel
        formatMessage={formatMessage}
        isOpen={isPanelOpen}
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
