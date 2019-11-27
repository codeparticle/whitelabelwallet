import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  useTheme,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getChartPoints } from 'lib/utils';
import { GENERAL } from 'lib/constants';

const { TRANSACTION_TYPES: { RECEIVE } } = GENERAL;

function TransactionChart ({
  balance,
  transactions,
  minimumNumberOfChartPoints,
}) {
  const [chartDataPoints, setChartDataPoints] = useState([]);
  const theme = useTheme('wallet');

  const buildChartData = useCallback(
    async () => {
      if (transactions.length === 0) {
        return [];
      }

      const chronologicalTransactions = transactions.reverse();

      // Current balance is equal to the balance of the latest transaction.
      const currentBalance = chronologicalTransactions.length > 0
        ? balance
        : 0;

      // Create array of point coordinates using the chronologicalTransactions starting from
      // the current balance and adjusting depending on transaction_type and amount
      let chartData = [];

      if (chronologicalTransactions.length > 0) {
        chartData = getChartPoints(currentBalance, chronologicalTransactions, RECEIVE, false);
        chartData.push({ x: chronologicalTransactions.length, y: balance });
      }

      // Check if we have enough transactions to build the chart, if so, set the chartData in state.
      if (chartData.length >= minimumNumberOfChartPoints) {
        setChartDataPoints(chartData.reverse());
        return;
      }

      // set the data to chronological order before moving on
      chartData.reverse();

      // If not, calculate the number of remaining points to plot on the chart.
      const numberOfRemainingChartPoints = minimumNumberOfChartPoints - chronologicalTransactions.length;

      // Since there are not enough transactions over the last three months then we create point coordinates using the balance of the most recent transaction available.
      for (let counter = minimumNumberOfChartPoints - numberOfRemainingChartPoints; counter < minimumNumberOfChartPoints; counter++) {
        chartData.push({ x: counter + 1, y: currentBalance });
      }

      setChartDataPoints(chartData);
    }, [balance, transactions],
  );

  useEffect(() => {
    if (transactions.length > 0) {
      buildChartData();
    }
  }, [transactions, buildChartData]);

  return (
    <AreaChart
      colors={[theme.gradientStart, theme.gradientEnd]}
      data={chartDataPoints}
      padding={0}/>
  );
}

TransactionChart.prototypes = {
  colors: PropTypes.array,
  minimumNumberOfChartPoints: PropTypes.number,
  transactions: PropTypes.array.isRequired,
};

TransactionChart.defaultProps = {
  minimumNumberOfChartPoints: 6,
};

export { TransactionChart };