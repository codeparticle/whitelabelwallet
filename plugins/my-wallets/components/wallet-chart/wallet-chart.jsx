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
import { green } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';

function WalletChart ({
  selectedWalletAddresses,
  selectedWalletTransactions,
  selectedWallet,
  maxNumberOfChartPoints,
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

    const date3MonthsAgo = moment().subtract(3, 'months').format('YYYY-MM-DD');
    let availableTransactions = [];

    await asyncForEach(selectedWalletAddresses, async (addressData) => {
      const transactionsInTimeRange = await getTransactionsForChart(addressData.address, date3MonthsAgo);
      availableTransactions.push(...transactionsInTimeRange);
    });

    availableTransactions = uniqBy(availableTransactions, transaction => transaction.id);
    const distinctTransactions = availableTransactions.sort((currentDate, nextDate) => moment(currentDate).isBefore(moment(nextDate)));

    const currentBalance = distinctTransactions.length > 0
      ? distinctTransactions[distinctTransactions.length - 1].pending_balance
      : 0;

    const numberOfRemainingChartPoints = maxNumberOfChartPoints - distinctTransactions.length;
    const chartData = distinctTransactions.map((transaction, index) => {
      return { x: index + 1, y: transaction.pending_balance };
    });

    for (let counter = maxNumberOfChartPoints - numberOfRemainingChartPoints; counter < maxNumberOfChartPoints; counter++) {
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
  maxNumberOfChartPoints: PropTypes.number,
  selectedWalletAddresses: PropTypes.array.isRequired,
  selectedWallet: PropTypes.object.isRequired,
  selectedWalletTransactions: PropTypes.array.isRequired,
};

WalletChart.defaultProps = {
  colors: [green],
  maxNumberOfChartPoints: 6,
};

export { WalletChart };