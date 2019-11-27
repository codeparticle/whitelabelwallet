import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { asyncForEach, getChartPoints } from 'lib/utils';
import { GENERAL } from 'lib/constants';
import { uniqBy } from 'lodash';
import {
  getTransactionsForChart,
} from 'plugins/my-wallets/helpers';
import {
  AreaChart,
  useTheme,
} from '@codeparticle/whitelabelwallet.styleguide';

const { TRANSACTION_TYPES: { RECEIVE } } = GENERAL;

function WalletChart ({
  balance,
  minimumNumberOfChartPoints,
  selectedWalletAddresses,
  selectedWalletTransactions,
  selectedWallet,
}) {

  const [chartDataPoints, setChartDataPoints] = useState([]);
  const theme = useTheme('wallet');

  useEffect(() => {
    if (selectedWalletTransactions.length > 0) {
      buildChartData();
    }
  }, [selectedWalletTransactions, selectedWallet]);

  const buildChartData = async () => {
    if (selectedWalletTransactions.length === 0 || selectedWalletAddresses.length === 0) {
      return;
    }

    // The is the agreed upon date range for the chart for now. TODO: make this a better range.
    const date3MonthsAgo = moment().subtract(3, 'months').format('YYYY-MM-DD');
    let availableTransactions = [];

    // Get the transactions within the date range for each address that belongs to the wallet.
    await asyncForEach(selectedWalletAddresses, async (addressData) => {
      const transactionsInTimeRange = await getTransactionsForChart(addressData.address, date3MonthsAgo);
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
    if (chartData.length >= minimumNumberOfChartPoints) {
      setChartDataPoints(chartData.reverse());
      return;
    }

    // set the data to chronological order before moving on
    chartData.reverse();

    // If not, calculate the number of remaining points to plot on the chart.
    const numberOfRemainingChartPoints = minimumNumberOfChartPoints - distinctTransactions.length;

    // Since there are not enough transactions over the last three months then we create point coordinates using the balance of the most recent transaction available.
    for (let counter = minimumNumberOfChartPoints - numberOfRemainingChartPoints; counter < minimumNumberOfChartPoints; counter++) {
      chartData.push({ x: counter + 1, y: currentBalance });
    }

    setChartDataPoints(chartData);
  };

  return (
    <AreaChart
      colors={[theme.gradientStart, theme.gradientEnd]}
      data={chartDataPoints}
      padding={0}/>
  );
}

WalletChart.prototypes = {
  balance: PropTypes.number,
  colors: PropTypes.array,
  minimumNumberOfChartPoints: PropTypes.number,
  selectedWalletAddresses: PropTypes.array.isRequired,
  selectedWallet: PropTypes.object.isRequired,
  selectedWalletTransactions: PropTypes.array.isRequired,
};

WalletChart.defaultProps = {
  balance: 0,
  minimumNumberOfChartPoints: 6,
};

export { WalletChart };