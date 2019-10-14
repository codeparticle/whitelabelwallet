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
  IconButton,
  IconVariants,
  Select,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { Page } from 'components';

import {
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
} from 'plugins/my-wallets/rdx/selectors';
import {
  getWalletById,
  getAddressesByWalletId,
  getTransactionsPerAddress,
  ROUTES,
  DATE_OPTIONS,
} from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import './wallet-overview.scss';


const { SvgPencil, SvgCoinSymbol } = svgs.icons;
const { PLUGIN } = ROUTES;
const { SECONDARY } = VARIANTS;
const { SLATE } = IconVariants;
const { SLATE_CLEAR } = ButtonVariants;
const {
  TODAY,
  WEEK,
  MONTH,
  YEAR,
  ALL_TIME,
} = DATE_OPTIONS;
const {
  MANAGE_WALLET_BUTTON_LABEL,
  CURRENT_BALANCE_LABEL,
  DATE_OPTION_TODAY,
  DATE_OPTION_WEEK,
  DATE_OPTION_MONTH,
  DATE_OPTION_YEAR,
  DATE_OPTION_ALL_TIME,
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

function NoTransactions({ formatMessage, isMobile }) {
  return (
    <div className={`empty-list ${isMobile ? 'hide' : ''}`}>
      <h1>{formatMessage(NO_TRANSACTIONS_TEXT)}</h1>
    </div>
  );
}

function getSelectOptions (formatMessage, getDateValue) {
  return [
    { value: getDateValue(TODAY), label: formatMessage(DATE_OPTION_TODAY) },
    { value: getDateValue(WEEK), label: formatMessage(DATE_OPTION_WEEK) },
    { value: getDateValue(MONTH), label: formatMessage(DATE_OPTION_MONTH) },
    { value: getDateValue(YEAR), label: formatMessage(DATE_OPTION_YEAR) },
    { value: getDateValue(), label: formatMessage(DATE_OPTION_ALL_TIME) },
  ];
}

function WalletOverviewView({
  intl: {
    formatMessage,
  },
  match,
  selectedWallet,
  selectedWalletAddresses,
  selectedWalletTransactions,
  ...props
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getDateValue());
  const [selectedAddress, setSelectedAddress] = useState({});
  const [previousSelectedDate, setPreviousSelectedData] = useState(selectedDate);
  const { name } = selectedWallet;
  const { walletId } = match.params;
  const { isMobile } = useMedia();

  useEffect(() => {
    getWalletById(walletId, props.setSelectedWallet);
    getAddressesByWalletId(props.setSelectedWalletAddresses, walletId).then((addresses) => fetchTransactions(addresses));
  }, [setSelectedWallet]);

  useEffect(() => {
    setSelectedAddress(selectedWalletAddresses[0]);
  }, [selectedWalletAddresses]);

  useEffect(() => {
    if (previousSelectedDate !== selectedDate) {
      setPreviousSelectedData(selectedDate);
      fetchTransactions(selectedWalletAddresses, selectedDate);
    }
  }, [selectedDate]);

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

    return walletAddresses.map((addressData) => getTransactionsPerAddress(props.setSelectedWalletTransactions, addressData.address, dateValue));
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
    return selectedWalletAddresses.reduce((total, currentAddress) => {
      return total + currentAddress.balance;
    }, 0);
  }

  const haveTransactions =  selectedWalletTransactions.length > 0;

  return (
    <Page
      headerProps={{
        PrimaryAction,
        SecondaryAction,
        title: name || '',
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
          <div className="wallet-balance-data">
            <p className="current-balance-text">{formatMessage(CURRENT_BALANCE_LABEL)}</p>
            <p className="balance"><SvgCoinSymbol/>{`${getBalance()}`}</p>
            <span className="usd-value">$5,911.19</span>
          </div>
        </div>
        <div className={`list-wrapper${haveTransactions ? '' : '-empty'}`}>
          <div className={isMobile ? `mobile-list` : ''}>
            <Visible
              when={haveTransactions}
              fallback={<NoTransactions isMobile={isMobile} formatMessage={formatMessage}/>}
            >
              <TransactionsList
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
  selectedWallet: PropTypes.object,
  selectedWalletTransactions: PropTypes.array,
  setSelectedWallet: PropTypes.func.isRequired,
};

WalletOverviewView.defaultProps = {
  selectedWallet: {},
};

const mapStateToProps = (state) => {
  const selectedWallet = getSelectedWallet(state);
  const selectedWalletAddresses = getSelectedWalletAddresses(state);
  const selectedWalletTransactions = getSelectedWalletTransactions(state);

  return {
    selectedWallet,
    selectedWalletAddresses,
    selectedWalletTransactions,
  };
};

const mapDispatchToProps = {
  setSelectedWallet,
  setSelectedWalletAddresses,
  setSelectedWalletTransactions,
  setSelectedWalletTransactionsSearchResults,
};

export const WalletOverviewPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletOverviewView));
