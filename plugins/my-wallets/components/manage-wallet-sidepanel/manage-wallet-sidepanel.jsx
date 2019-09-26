/**
 * @fileoverview Manage Wallet Sidepanel
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import {
  Overlay,
  TextInput,
  TextArea,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getSidepanelVariant, safeString, unescape } from 'lib/utils';
import { TRANSLATION_KEYS } from 'translations/keys';

import { updateWalletAndUpdateState } from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { validateManageWallet } from './validate-manage-wallet';
import './manage-wallet-sidepanel.scss';

const { COMMON: { SAVE_CHANGES } } = TRANSLATION_KEYS;
const {
  DESCRIPTION_LABEL,
  MANAGE_WALLET_PANEL_LABEL,
  WALLET_NICKNAME_LABEL,
} = MY_WALLETS;
const { SvgWallet } = svgs.icons;

const NAME = 'name';
const DESCRIPTION = 'description';

const initialWalletFields = {
  [NAME]: '',
  [DESCRIPTION]: '',
};

const initialInputErrors = {
  [NAME]: false,
};

function ManageWalletSidepanel({
  formatMessage,
  isOpen,
  onClose,
  setSelectedWallet,
  wallet,
}) {
  const [walletFields, setWalletFields] = useState(initialWalletFields);
  const [inputErrors, setInputErrors] = useState(initialInputErrors);
  const { isMobile } = useMedia();
  const panelVariant = getSidepanelVariant({ isMobile });

  useEffect(() => {
    const { name, description = '' } = wallet;

    setWalletFields({
      name,
      description: unescape(description),
    });
  }, [wallet]);

  function onInputChange(e) {
    e.preventDefault();

    setWalletFields({
      ...walletFields,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit() {
    const { name, description } = walletFields;

    const hasError = validateManageWallet({ name });

    if (hasError) {
      setInputErrors(hasError);
      return;
    }

    const walletToUpdate = {
      ...wallet,
      name,
      description: safeString(description),
    };

    updateWalletAndUpdateState(walletToUpdate, setSelectedWallet).then(onClose);
  }

  return (
    <Overlay
      footerButtonText={formatMessage(SAVE_CHANGES)}
      Icon={SvgWallet}
      isOpen={isOpen}
      onClick={onSubmit}
      onClose={onClose}
      title={wallet.name || ''}
      subTitle={formatMessage(MANAGE_WALLET_PANEL_LABEL)}
      type={panelVariant}
    >
      <div className="manage-wallet-content">
        <TextInput
          className="manage-wallet-content__text-input"
          hasError={inputErrors[NAME]}
          name={NAME}
          label={formatMessage(WALLET_NICKNAME_LABEL)}
          onChange={onInputChange}
          value={walletFields[NAME]}
        />
        <TextArea
          className="manage-wallet-content__text-area"
          name={DESCRIPTION}
          label={formatMessage(DESCRIPTION_LABEL)}
          onChange={onInputChange}
          value={walletFields[DESCRIPTION]}
        />
      </div>
      <Visible when={isMobile}>
        <style jsx>
          {`
            :global(.sidepanel-content) {
              flex: 0 !important;
            }
          `}
        </style>
      </Visible>
    </Overlay>
  );
}

ManageWalletSidepanel.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired,
};

export {
  ManageWalletSidepanel,
};
