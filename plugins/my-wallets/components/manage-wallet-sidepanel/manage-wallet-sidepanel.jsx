/**
 * @fileoverview Manage Wallet Sidepanel
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
import { Visible } from '@codeparticle/react-visible';
import {
  Overlay,
  TextInput,
  TextArea,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getSidepanelVariant, safeString, unescape, empty } from 'lib/utils';
import { TRANSLATION_KEYS } from 'translations/keys';

import {
  addAddress,
  BUTTON_TYPES,
  refreshAddress,
  updateWalletAndUpdateState,
} from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { AddressListItem } from 'plugins/my-wallets/components';
import { validateManageWallet } from './validate-manage-wallet';
import './manage-wallet-sidepanel.scss';

const { ICON, TEXT } = BUTTON_TYPES;
const { COMMON: { SAVE_CHANGES } } = TRANSLATION_KEYS;
const {
  DESCRIPTION_LABEL,
  MANAGE_WALLET_PANEL_LABEL,
  MANAGE_WALLET_ADD_ADDRESS,
  MANAGE_WALLET_ADDRESS_NICKNAME,
  MANAGE_WALLET_DELETE_ADDRESS,
  MANAGE_WALLET_REFRESH_ADDRESS,
  WALLET_NICKNAME_LABEL,
} = MY_WALLETS;
const {
  SvgWallet,
  SvgCurrencyConversionSymbol,
  SvgRemove,
} = svgs.icons;

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
  setSelectedWalletAddresses,
  setSelectedWallet,
  addresses,
  wallet,
}) {
  const [walletFields, setWalletFields] = useState(initialWalletFields);
  const [inputErrors, setInputErrors] = useState(initialInputErrors);
  const [newAddressNickname, setNewAddressNickname] = useState('');
  const { isMobile } = useMedia();
  const isMultiAddress = wallet.multi_address === 1;
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

  function onAddressNickNameChange(e) {
    setNewAddressNickname(safeString(e.target.value));
  }

  function handleOnClose() {
    setNewAddressNickname('');
    onClose();
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

    updateWalletAndUpdateState(walletToUpdate, setSelectedWallet).then(handleOnClose);
  }

  function getTitle() {
    if (addresses && isMultiAddress) {
      return `${wallet.name} (${addresses.length})`;
    }

    return wallet.name || '';
  }

  function onRefreshAddress(address) {
    refreshAddress(wallet, address, setSelectedWalletAddresses, setSelectedWallet);
  }

  function onAddAddress() {
    addAddress(wallet, newAddressNickname, setSelectedWalletAddresses);
    setNewAddressNickname('');
  }

  const addressFields = addresses.map((address, index) => {
    const buttonGroup = [
      {
        icon: SvgCurrencyConversionSymbol,
        onClick: () => onRefreshAddress(address),
        type: ICON,
        tooltipText: formatMessage(MANAGE_WALLET_REFRESH_ADDRESS),
      },
      {
        icon: SvgRemove,
        onClick: () => empty,
        type: ICON,
        tooltipText: formatMessage(MANAGE_WALLET_DELETE_ADDRESS),
      },
    ];

    const buttonData = !isMobile ? buttonGroup : [];
    const addressLabelDefault = `${wallet.name} ${index + 1}`;

    if (isMobile) {
      return (
        <AddressListItem
          address={address.address}
          label={address.name || addressLabelDefault}
          key={address.id}
          onRefresh={() => onRefreshAddress(address)}
          onDelete={() => empty}
        />
      );
    }

    return (
      <TextInput
        buttons={buttonData}
        className="multi-address-field"
        key={address.id}
        label={address.name || addressLabelDefault}
        onChange={empty}
        value={address.address}
        readOnly
      />
    );
  });

  const addAddressButton = [{
    type: TEXT,
    text: formatMessage(MANAGE_WALLET_ADD_ADDRESS),
    onClick: onAddAddress,
  }];

  return (
    <Overlay
      footerButtonText={formatMessage(SAVE_CHANGES)}
      Icon={SvgWallet}
      isOpen={isOpen}
      onClick={onSubmit}
      onClose={handleOnClose}
      onCancelClick={handleOnClose}
      title={getTitle()}
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
        <Visible when={isMultiAddress}>
          <div className={classNames(
            'multi-address-fields-wrapper',
            { 'mobile-fields-wrapper': isMobile },
          )}>
            <Visible when={isMobile}>
              <div className="addresses-section">
                <label>{'Replace Me'}</label>
              </div>
            </Visible>
            {addressFields}
            <Visible when={!isMobile}>
              <TextInput
                buttons={addAddressButton}
                className="add-address-field"
                onChange={onAddressNickNameChange}
                placeholder={formatMessage(MANAGE_WALLET_ADDRESS_NICKNAME)}
                value={newAddressNickname}
              />
            </Visible>
          </div>
        </Visible>
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
  addresses: PropTypes.array,
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setSelectedWalletAddresses: PropTypes.func.isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired,
};

ManageWalletSidepanel.defaultProps = {
  addresses: [],
};

export {
  ManageWalletSidepanel,
};
