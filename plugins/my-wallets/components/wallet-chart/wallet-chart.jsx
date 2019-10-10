import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { asyncForEach } from 'lib/utils';
import { uniqBy } from 'lodash';
import {
  getTransactionsForChart,
} from 'plugins/my-wallets/helpers';
import {
  AreaChart,
} from '@codeparticle/whitelabelwallet.styleguide';

const chartColor = '#7bc32b57';

function WalletChart ({
  selectedWalletAddresses,
  selectedWalletTransactions,
  selectedWallet,
  minimumNumberOfChartPoints,
  colors,
}) {

  const [chartDataPoints, setChartDataPoints] = useState([]);

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
      ? distinctTransactions[distinctTransactions.length - 1].pending_balance
      : 0;

    // Create array of point coordinates using the distinctTransactions
    const chartData = distinctTransactions.map((transaction, index) => {
      return { x: index + 1, y: transaction.pending_balance };
    });

    // Check if we have enough transactions to build the chart, if so, set the chartData in state.
    if (chartData.length >= minimumNumberOfChartPoints) {
      setChartDataPoints(chartData);
      return;
    }

    // If not, calculate the number of remaining points to plot on the chart.
    const numberOfRemainingChartPoints = minimumNumberOfChartPoints - distinctTransactions.length;

    // Since there are not enough transactions over the last three months then we create point coordinates using the balance of the most recent transaction available.
    for (let counter = minimumNumberOfChartPoints - numberOfRemainingChartPoints; counter < minimumNumberOfChartPoints; counter++) {
      chartData.push({ x: counter, y: currentBalance });
    }

    setChartDataPoints(chartData);
  };

  return (
    <AreaChart
      colors={colors}
      data={chartDataPoints}
      padding={0}/>
  );
}

WalletChart.prototypes = {
  colors: PropTypes.array,
  minimumNumberOfChartPoints: PropTypes.number,
  selectedWalletAddresses: PropTypes.array.isRequired,
  selectedWallet: PropTypes.object.isRequired,
  selectedWalletTransactions: PropTypes.array.isRequired,
};

WalletChart.defaultProps = {
  colors: [chartColor],
  minimumNumberOfChartPoints: 6,
};

export { WalletChart };