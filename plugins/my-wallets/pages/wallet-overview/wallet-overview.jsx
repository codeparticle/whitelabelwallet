/**
 * @fileoverview Wallet overview page
 * @author Gabriel Womble, Marc Mathieu
 */
import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import {
  AreaChart,
  cellFormatters,
  Button,
  ButtonVariants,
  IconButton,
  IconVariants,
  List,
  Select,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { red, green } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';
import { VARIANTS } from 'lib/constants';
import { Page } from 'components';

import {
  setSelectedWallet,
  setSelectedWalletAddresses,
  setSelectedWalletTransactions,
} from 'plugins/my-wallets/rdx/actions';
import { ManageWalletSidepanel, SearchTransactions }  from 'plugins/my-wallets/components';
import {
  getSelectedWallet,
  getSelectedWalletAddresses,
  getSelectedWalletTransactions,
} from 'plugins/my-wallets/rdx/selectors';
import {
  getWalletById,
  getAddressesByWalletId,
  getTransactionsPerAddress,
  ROUTES } from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import './wallet-overview.scss';


const { SvgPencil, SvgCoinSymbol } = svgs.icons;
const { PLUGIN } = ROUTES;
const { SECONDARY } = VARIANTS;
const { SLATE } = IconVariants;
const { SLATE_CLEAR } = ButtonVariants;
const { Text } = cellFormatters;
const {
  MANAGE_WALLET_BUTTON_LABEL,
  CURRENT_BALANCE_LABEL,
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
  selectedWallet,
  selectedWalletAddresses,
  selectedWalletTransactions,
  ...props
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { name } = selectedWallet;
  const { walletId } = match.params;
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  useEffect(() => {
    getWalletById(walletId, props.setSelectedWallet);
    getAddressesByWalletId(props.setSelectedWalletAddresses, walletId).then((addresses) => fetchTransactions(addresses));
  }, [setSelectedWallet]);

  const toggleSidePanel = () => setIsPanelOpen(!isPanelOpen);

  function fetchTransactions(walletAddresses) {
    return walletAddresses.map((addressData) =>  getTransactionsPerAddress(props.setSelectedWalletTransactions, addressData.address));
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
      options: options,
      className: 'date-picker',
    };

    return (
      <Visible when={ !collapsed }>
        <Select {...selectProps} />
      </Visible>
    );

  }

  function customAmountRenderer({ data, column }) {
    const color = data.transaction_type === 'receive'
      ? green
      : red;

    return (
      <Fragment>
        <p className="transaction-amount"><SvgCoinSymbol/>{`${column}`}</p>
        <style jsx>
          {`
              p {
                color: ${color};
              }
            `}
        </style>
      </Fragment>
    );
  }

  function customAddressRenderer({ data }) {
    const address = data.transaction_type === 'receive'
      ? data.receiver_address
      : data.sender_address;
    const { name = null } = selectedWalletAddresses.find((walletAddress) => walletAddress.address === address) || {};

    return (
      <Fragment>
        <Text value={name || ''}/>
      </Fragment>
    );
  }

  function customDateRenderer({ data }) {
    const formattedDate = moment(data.created_date).format('MMMM Do YYYY, h:mm:ss a');

    return (
      <Fragment>
        <Text value={formattedDate} />
      </Fragment>
    );
  }

  function getBalance() {
    return selectedWalletAddresses.reduce((total, currentAddress) => {
      return total + currentAddress.balance;
    }, 0);
  }

  const chartData = [
    { x: 1, y: 8 },
    { x: 2, y: 10 },
    { x: 3, y: 12 },
    { x: 4, y: 4 },
    { x: 5, y: 14 },
    { x: 6, y: 6 },
  ];

  const columnDefs = [
    {
      title: 'Date',
      gridColumns: '1 / 3',
      property: 'created_date',
      customRenderer: customDateRenderer,
    },
    {
      title: 'Address',
      gridColumns: '4 / 7',
      property: 'transaction_type',
      customRenderer: customAddressRenderer,
    },
    {
      title: 'Details',
      gridColumns: '7 / 10',
      property: 'description',
    },
    {
      title: 'Amount',
      gridColumns: '12',
      property: 'amount',
      customRenderer: customAmountRenderer,
    },
  ];

  const removeAddressColumn = (columns) => {
    columns.splice(1, 1);
    return columns;
  };

  const onRowClicked = () => {
    console.log('row clicked');
  };

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
      <div className="page-content-container">
        <div className="search-wrapper">
          <SearchTransactions
            manager={manager}
            formatMessage={formatMessage}
            setSelectedWalletTransactions={setSelectedWalletTransactions}
          />
        </div>
        <div className="chart-wrapper">
          <AreaChart
            colors={[green]}
            data={chartData}
            padding={0}>
          </AreaChart>
          <div className="wallet-balance-data">
            <p className="current-balance-text">{formatMessage(CURRENT_BALANCE_LABEL)}</p>
            <p className="balance"><SvgCoinSymbol/>{`${getBalance()}`}</p>
            <span className="usd-value">$5,911.19</span>
          </div>
        </div>
        <div className="list-wrapper">
          <List
            id="wallet-list"
            isStriped
            columnDefs={selectedWallet.multi_address === 1 ? columnDefs : removeAddressColumn(columnDefs)}
            onRowClicked={onRowClicked}
            rowData={listData}
          />
        </div>
      </div>
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
};

export const WalletOverviewPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletOverviewView));
