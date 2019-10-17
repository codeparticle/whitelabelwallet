/**
 * @fileoverview Wallet overview page
 * @author Gabriel Womble, Marc Mathieu
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import {
  Button,
  ButtonVariants,
  Carousel,
  IconButton,
  IconVariants,
  Select,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { getSelectOptions } from 'lib/utils';
import { Page, NoTransactions } from 'components';

import {
  setSelectedAddress,
  setSelectedWallet,
  setSelectedWalletAddresses,
  setSelectedWalletTransactions,
  setSelectedWalletTransactionsSearchResults,
} from 'plugins/my-wallets/rdx/actions';
import {
  ManageWalletSidepanel,
  SearchTransactions,
  TransactionsList,
  WalletChart,
  WalletNavBar,
}  from 'plugins/my-wallets/components';
import {
  getSelectedWallet,
  getSelectedWalletAddresses,
  getSelectedWalletTransactions,
  getSelectedAddress,
} from 'plugins/my-wallets/rdx/selectors';
import {
  getWalletById,
  getAddressesByWalletId,
  getTransactionsPerAddress,
  ROUTES,
} from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { COMMON } from 'translations/keys/common';
import './wallet-overview.scss';


const { SvgPencil, SvgCoinSymbol } = svgs.icons;
const { PLUGIN } = ROUTES;
const { SECONDARY } = VARIANTS;
const { SLATE } = IconVariants;
const { SLATE_CLEAR } = ButtonVariants;
const { ALL_TIME } = COMMON;
const {
  ALL_ADDRESS_TEXT,
  CURRENT_BALANCE_LABEL,
  MANAGE_WALLET_BUTTON_LABEL,
  NO_TRANSACTIONS_TEXT,
} = MY_WALLETS;

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
  selectedAddress,
  selectedWallet,
  selectedWalletAddresses,
  selectedWalletTransactions,
  ...props
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getDateValue());
  const [isMultiAddress, setIsMultiAddress] = useState(false);
  const [previousSelectedDate, setPreviousSelectedData] = useState(selectedDate);
  const [addressData, setAddressData] = useState([]);
  const { name } = selectedWallet;
  const { walletId } = match.params;
  const { isMobile } = useMedia();
  const haveTransactions =  selectedWalletTransactions.length > 0;
  const isMobileMultiAddress = isMobile && selectedWallet.multi_address === 1;
  const isWalletInitialized = selectedWalletAddresses.length > 0 && Object.keys(selectedWallet).length > 0;
  const multiAddressData = { name: formatMessage(ALL_ADDRESS_TEXT), showTotal: true };

  useEffect(() => {
    getWalletById(walletId, props.setSelectedWallet);
    getAddressesByWalletId(props.setSelectedWalletAddresses, walletId).then((addresses) => fetchTransactions(addresses));
  }, [setSelectedWallet, isMultiAddress]);

  useEffect(() => {
    if (isWalletInitialized) {
      if (isMobileMultiAddress && addressData.length === 0) {
        setAddressData([multiAddressData, ...selectedWalletAddresses]);
      } else if (isMobileMultiAddress && addressData.length > 0) {
        props.setSelectedAddress(addressData[0]);
      }
    }
  }, [selectedWalletAddresses, isMobileMultiAddress, addressData, isWalletInitialized]);

  useEffect(() => {
    if (previousSelectedDate !== selectedDate) {
      setPreviousSelectedData(selectedDate);
      fetchTransactions(selectedWalletAddresses, selectedDate);
    }
  }, [selectedDate, isMultiAddress]);

  useEffect(() => {
    const walletType = selectedWallet.multi_address === 1 ? true : false;
    setIsMultiAddress(walletType);
  }, [setSelectedWallet, selectedWallet]);

  const toggleSidePanel = (event) => {
    event.stopPropagation();
    setIsPanelOpen(!isPanelOpen);
  };

  const onClose = ()=> {
    setIsPanelOpen(false);
  };

  function getDateValue(desiredDate = ALL_TIME) {
    let queryDate = null;

    if (desiredDate !== ALL_TIME) {
      queryDate = moment().startOf(desiredDate).format('YYYY-MM-DD');
    }

    return queryDate;
  }

  function fetchTransactions(walletAddresses, filterDate = null) {
    const dateValue = filterDate && filterDate.value
      ? filterDate.value
      : null;

    let setterFunction = props.setSelectedWalletTransactionsSearchResults;

    if (isMultiAddress && dateValue === null) {
      setterFunction = props.setSelectedWalletTransactions;
    }

    return walletAddresses.map((addressData) => getTransactionsPerAddress(setterFunction, addressData.address, dateValue));
  }

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

  function SecondaryAction({ collapsed }) {
    const selectProps = {
      value: selectedDate,
      onChange: setSelectedDate,
      options: getSelectOptions(formatMessage, getDateValue),
      className: 'date-picker',
    };

    return (
      <Visible when={!collapsed}>
        <Select {...selectProps} />
      </Visible>
    );

  }

  function getBalance() {
    if (!isMobileMultiAddress || selectedAddress.showTotal) {
      return selectedWalletAddresses.reduce((total, currentAddress) => {
        return total + currentAddress.balance;
      }, 0);
    }

    return selectedAddress.balance;
  }

  function getTitle() {
    if (!isMobileMultiAddress) {
      return name;
    }

    return `${name} (${selectedWalletAddresses.length})`;
  }


  return (
    <Page
      headerProps={{
        PrimaryAction,
        SecondaryAction,
        title: getTitle() || '',
        to: `/${PLUGIN}`,
        type: SECONDARY,
      }}
      removePadding
      className={'wallet-overview-page'}
    >
      <div className={`page-content-container ${isMobile ? 'mobile-content-container' : ''}`}>
        <Visible when={!isMobile}>
          <div className="search-wrapper">
            <SearchTransactions
              formatMessage={formatMessage}
              setSelectedWalletTransactionsSearchResults={props.setSelectedWalletTransactionsSearchResults}
              selectedWalletAddresses={selectedWalletAddresses}
            />
          </div>
        </Visible>
        <div className="chart-wrapper">
          {selectedWalletTransactions && <WalletChart
            selectedWalletTransactions={selectedWalletTransactions}
            selectedWalletAddresses={selectedWalletAddresses}
            selectedWallet={selectedWallet}/>}
          <Visible when={isMobileMultiAddress}>
            <div className="selected-address-wrapper">
              <p className="selected-address">{selectedAddress.name}</p>
            </div>
          </Visible>
          <div className="wallet-balance-data">
            <p className="current-balance-text">{formatMessage(CURRENT_BALANCE_LABEL)}</p>
            <p className="balance"><SvgCoinSymbol/>{`${getBalance()}`}</p>
            <span className="usd-value">$5,911.19</span>
          </div>
          <Visible when={isMobileMultiAddress}>
            <div className="carousel-wrapper">
              <Carousel dataSet={addressData} onChange={props.setSelectedAddress} />
            </div>
          </Visible>
        </div>
        <div className={`list-wrapper${haveTransactions ? '' : '-empty'}`}>
          <div className={isMobile ? `mobile-list` : ''}>
            <Visible
              when={haveTransactions}
              fallback={<NoTransactions formatMessage={formatMessage}/>}
            >
              <TransactionsList
                selectedAddress={selectedAddress}
                selectedWallet={selectedWallet}
                selectedWalletAddresses={selectedWalletAddresses}
                selectedWalletTransactions={selectedWalletTransactions} />
            </Visible>
          </div>
        </div>
        <div className="wallet-nav-bar-wrapper">
          <Visible when={isMobile}>
            <WalletNavBar
              formatMessage={formatMessage}
              selectedWallet={selectedWallet}
              selectedAddress={selectedAddress}
            />
          </Visible>
        </div>
      </div>
      <ManageWalletSidepanel
        formatMessage={formatMessage}
        isOpen={isPanelOpen}
        onClose={onClose}
        setSelectedWallet={props.setSelectedWallet}
        wallet={selectedWallet}
      />
    </Page>
  );
}

WalletOverviewView.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  selectedAddress: PropTypes.object.isRequired,
  selectedWallet: PropTypes.object,
  selectedWalletTransactions: PropTypes.array,
  setSelectedWallet: PropTypes.func.isRequired,
};

WalletOverviewView.defaultProps = {
  selectedWallet: {},
};

const mapStateToProps = (state) => {
  const selectedAddress = getSelectedAddress(state);
  const selectedWallet = getSelectedWallet(state);
  const selectedWalletAddresses = getSelectedWalletAddresses(state);
  const selectedWalletTransactions = getSelectedWalletTransactions(state);

  return {
    selectedAddress,
    selectedWallet,
    selectedWalletAddresses,
    selectedWalletTransactions,
  };
};

const mapDispatchToProps = {
  setSelectedWallet,
  setSelectedAddress,
  setSelectedWalletAddresses,
  setSelectedWalletTransactions,
  setSelectedWalletTransactionsSearchResults,
};

export const WalletOverviewPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletOverviewView));
