import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { uniqBy } from 'lodash';
import {
  Wallet,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { injectIntl, intlShape } from 'react-intl';
import { asyncForEach, empty } from 'lib/utils';
import { setSelectedWallet } from 'plugins/my-wallets/rdx/actions';
import { getSelectedWallet } from 'plugins/my-wallets/rdx/selectors';
import { ManageWalletSidepanel }  from 'plugins/my-wallets/components';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { ROUTES } from 'plugins/my-wallets/helpers';
import {
  getAddressesByWalletId,
  getTransactionsForChart,
  MINIMUM_NUMBER_CHART_POINTS,
} from 'plugins/my-wallets/helpers';

import './wallets.scss';

const { PLUGIN, OVERVIEW } = ROUTES;
const { SvgCoinSymbol } = svgs.icons;

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

  const onDeposit = empty;
  const onWithdraw = empty;

  const buildWalletChart = async (id) => {
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
      ? distinctTransactions[distinctTransactions.length - 1].pending_balance
      : 0;

    // Create array of point coordinates using the distinctTransactions
    const chartData = distinctTransactions.map((transaction, index) => {
      return { x: index + 1, y: transaction.pending_balance };
    });

    // Check if we have enough transactions to build the chart, if so, set the chartData in state.
    if (chartData.length >= MINIMUM_NUMBER_CHART_POINTS) {
      return chartData;
    }

    // If not, calculate the number of remaining points to plot on the chart.
    const numberOfRemainingChartPoints = MINIMUM_NUMBER_CHART_POINTS - distinctTransactions.length;

    // Since there are not enough transactions over the last two months then we create point coordinates using the balance of the most recent transaction available.
    for (let counter = MINIMUM_NUMBER_CHART_POINTS - numberOfRemainingChartPoints; counter < MINIMUM_NUMBER_CHART_POINTS; counter++) {
      chartData.push({ x: counter, y: currentBalance });
    }

    return chartData;
  };

  useEffect(() => {
    const WalletDataPromises = wallets.map((wallet) => {
      return buildWalletChart(wallet.id).then((data) => {
        wallet.chartData = data;
        wallet.currentBalance = wallet.chartData[wallet.chartData.length - 1].y;
        return wallet;
      });
    });

    Promise.all(WalletDataPromises).then(function(results) {
      setWalletsWithChartData(results);
    });
  }, [wallets, setWalletsWithChartData]);



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

        return (
          <div key={wallet.id} className="wallets-rct-component__wallet-container">
            <Wallet
              {...commonProps}
              coinData={wallet.chartData}
              coinBalance={wallet.currentBalance}
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
  const selectedWallet = getSelectedWallet(state);

  return {
    selectedWallet,
  };
};



const mapDispatchToProps = {
  setSelectedWallet,
};

const Wallets = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WalletsView));

export { Wallets };
