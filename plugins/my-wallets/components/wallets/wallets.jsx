import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
import {
  Wallet,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { injectIntl, intlShape } from 'react-intl';
import { asyncForEach, getFiatAmount, getCurrencyFormat, getChartPoints } from 'lib/utils';
import { GENERAL, ROUTES as APP_ROUTES } from 'lib/constants';

import { preSelectFromAddress } from 'plugins/send-funds/rdx/actions';
import { preSelectReceiver } from 'plugins/receive-funds/rdx/actions';

import { setSelectedWallet, setSelectedWalletAddresses } from 'plugins/my-wallets/rdx/actions';
import { getSelectedWallet, getFiat } from 'plugins/my-wallets/rdx/selectors';
import { ManageWalletSidepanel }  from 'plugins/my-wallets/components';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { ROUTES } from 'plugins/my-wallets/helpers';
import {
  getAddressesByWalletId,
  getWalletAddressesById,
  getTransactionsForChart,
  MINIMUM_NUMBER_CHART_POINTS,
} from 'plugins/my-wallets/helpers';

import './wallets.scss';

const { SEND_FUNDS, RECEIVE_FUNDS } = APP_ROUTES;
const { PLUGIN, OVERVIEW } = ROUTES;
const { SvgCoinSymbol } = svgs.icons;
const { TRANSACTION_TYPES: { RECEIVE } } = GENERAL;

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
  selectedFiat,
  selectedWallet,
  ...props
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [walletsWithChartData, setWalletsWithChartData] = useState([]);
  const coinSymbol = <SvgCoinSymbol height="24" width="24" />;
  const commonProps = {
    currencySymbol: <span>&#36;</span>,
    coinSymbol,
    messages: {
      deposit: formatMessage(MY_WALLETS.RECEIVE_FUNDS_BUTTON_LABEL),
      withdraw: formatMessage(MY_WALLETS.SEND_FUNDS_BUTTON_LABEL),
    },
  };

  const buildWalletChart = useCallback(
    async (id, balance) => {
      const walletAddresses = await getAddressesByWalletId(null, id);

      const date2MonthsAgo = moment().subtract(2, 'months').format('YYYY-MM-DD');
      let availableTransactions = [];

      // Get the transactions within the date range for each address that belongs to the wallet.
      await asyncForEach(walletAddresses, async (addressData) => {
        const transactionsInTimeRange = await getTransactionsForChart(addressData.address, date2MonthsAgo);
        availableTransactions.push(...transactionsInTimeRange);
      });

      // Filter out possible duplicate transactions.
      availableTransactions = uniqBy(availableTransactions, transaction => transaction.id);
      const distinctTransactions = availableTransactions.reverse();

      // Current balance is equal to the balance of the latest transaction.
      const currentBalance = distinctTransactions.length > 0
        ? balance
        : 0;

      let chartData = [];

      // Create array of point coordinates using the distinctTransactions starting from
      // the current balance and adjusting depending on transaction_type and amount
      if (distinctTransactions.length > 0) {
        chartData = getChartPoints(currentBalance, distinctTransactions, RECEIVE);
      }

      // Check if we have enough transactions to build the chart, if so, set the chartData in state.
      if (chartData.length >= MINIMUM_NUMBER_CHART_POINTS) {
        return chartData.reverse();
      }

      // set the data to chronological order before moving on
      chartData.reverse();

      if (chartData.length < MINIMUM_NUMBER_CHART_POINTS) {
        // If not, calculate the number of remaining points to plot on the chart.
        const numberOfRemainingChartPoints = MINIMUM_NUMBER_CHART_POINTS - distinctTransactions.length;

        // Since there are not enough transactions over the last two months then we create point coordinates using the balance of the most recent transaction available.
        for (let counter = MINIMUM_NUMBER_CHART_POINTS - numberOfRemainingChartPoints; counter < MINIMUM_NUMBER_CHART_POINTS; counter++) {
          chartData.push({ x: counter + 1, y: currentBalance });
        }
      };

      return chartData;
    }, [],
  );

  async function getBalance(walletId) {
    const addresses = await getAddressesByWalletId(null, walletId);

    return addresses.reduce((total, currentAddress) => {
      return total + currentAddress.balance;
    }, 0);
  };

  useEffect(() => {
    if (wallets.length > 0) {
      const WalletDataPromises = wallets.map((wallet) => {
        return getBalance(wallet.id).then((balanceData) => {
          wallet.balance = balanceData;
          return wallet;
        }).then((walletData) => {
          return buildWalletChart(walletData.id, walletData.balance).then((chartData) => {
            walletData.chartData = chartData;
            return walletData;
          }).then((walletData) => {
            return getFiatAmount(walletData.balance, selectedFiat).then((fiatBalanceData) => {
              walletData.fiatBalance = parseFloat(fiatBalanceData.amount);
              return walletData;
            });
          });
        });
      });

      Promise.all(WalletDataPromises).then(setWalletsWithChartData);
    }
  }, [wallets, setWalletsWithChartData, buildWalletChart]);



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
      {walletsWithChartData.map((wallet) => {
        const onClick = () => onWalletClickHandler(wallet);
        const onEdit = (event) => onEditWalletClickHandler(event, wallet);

        async function setAddress(setFn) {
          const walletAddress = await getWalletAddressesById(wallet.id);
          setFn({
            id: walletAddress.id,
            data: walletAddress,
          });
        }

        const onDeposit = () => {
          setAddress(props.preSelectReceiver).then(() => {
            history.push(`${RECEIVE_FUNDS}`);
          });
        };

        const onWithdraw = () => {
          setAddress(props.preSelectFromAddress).then(() => {
            history.push(`${SEND_FUNDS}`);
          });
        };

        return (
          <div key={wallet.id} className="wallets-rct-component__wallet-container">
            <Wallet
              {...commonProps}
              currencyBalance={wallet.fiatBalance}
              coinData={wallet.chartData}
              coinBalance={wallet.balance}
              currencySymbol={getCurrencyFormat(selectedFiat, wallet.fiatBalance).symbol}
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
        setSelectedWalletAddresses={setSelectedWalletAddresses}
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
  selectedFiat: PropTypes.string.isRequired,
  selectedWallet: PropTypes.object.isRequired,
  preSelectFromAddress: PropTypes.func.isRequired,
  preSelectReceiver: PropTypes.func.isRequired,
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
  const selectedFiat = getFiat(state);
  const selectedWallet = getSelectedWallet(state);

  return {
    selectedFiat,
    selectedWallet,
  };
};



const mapDispatchToProps = {
  preSelectFromAddress,
  preSelectReceiver,
  setSelectedWalletAddresses,
  setSelectedWallet,
};

const Wallets = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletsView));

export { Wallets };
