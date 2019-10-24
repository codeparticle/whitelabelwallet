import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import { Page, NoTransactions } from 'components';
import { getSelectOptions } from 'lib/utils';
import { PLACEHOLDER_USD_VALUE } from 'lib/constants';
import { fetchAddresses, fetchTransactions } from 'plugins/transaction-history/helpers';
import {
  setAddresses,
  setTransactions,
  setTransactionsSearchResults,
} from 'plugins/transaction-history/rdx/actions';
import {
  SearchTransactions,
  TransactionChart,
  TransactionsList,
  TransactionDetailsSidepanel,
} from 'plugins/transaction-history/components';
import {
  getAddresses,
  getTransactions,
} from 'plugins/transaction-history/rdx/selectors';
import { COMMON } from 'translations/keys/common';
import { TRANSACTION_HISTORY } from 'plugins/transaction-history/translations/keys';
import {
  Select,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import './transaction-history.scss';

const { ALL_TIME } = COMMON;
const { NAV_ITEM } = TRANSACTION_HISTORY;
const { SvgCoinSymbol } = svgs.icons;

const TransactionHistoryView = ({
  addresses,
  intl: {
    formatMessage,
  },
  transactions,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(getDateValue());
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [previousSelectedDate, setPreviousSelectedData] = useState(selectedDate);
  const { isMobile } = useMedia();
  const haveTransactions =  transactions.length > 0;
  const {
    setAddresses,
    setTransactionsSearchResults,
    setTransactions,
  } = props;

  const contentClass = classNames(
    'page-content-container',
    { 'mobile-content-container': isMobile }
  );

  useEffect(() => {
    fetchTransactions(setTransactions);
  }, [setTransactions]);

  useEffect(() => {
    fetchAddresses(setAddresses);
  }, [setAddresses]);

  useEffect(() => {
    if (previousSelectedDate !== selectedDate) {
      setPreviousSelectedData(selectedDate.value);
      fetchTransactions(setTransactions, selectedDate.value);
    }
  }, [selectedDate]);


  function getDateValue(desiredDate = ALL_TIME) {
    let queryDate = null;

    if (desiredDate !== ALL_TIME) {
      queryDate = moment().startOf(desiredDate).format('YYYY-MM-DD');
    }

    return queryDate;
  }

  function getBalance() {
    return transactions.reduce((total, currentTransaction) => {
      return total + currentTransaction.pending_balance;
    }, 0);
  }

  function toggleSidePanel (data) {
    data.event.stopPropagation();
    setSelectedTransaction(data);
    setSelectedRow(data.event.target);
    setIsPanelOpen(true);
  };

  const onClose = ()=> {
    selectedRow.click();
    setSelectedRow(null);
    setIsPanelOpen(false);
  };

  const onDeselect = () => {
    setSelectedTransaction({});
  };

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

  };

  return (
    <Page
      headerProps={{
        title: formatMessage(NAV_ITEM),
        SecondaryAction,
      }}
      removePadding
      className="transaction-history-page"
      sidepanel={
        <TransactionDetailsSidepanel
          formatMessage={formatMessage}
          isOpen={isPanelOpen}
          onClose={onClose}
          selectedTransaction={selectedTransaction}
        />
      }
    >
      <div className={contentClass}>
        <Visible when={!isMobile}>
          <div className="search-wrapper">
            <SearchTransactions
              formatMessage={formatMessage}
              setTransactionsSearchResults={setTransactionsSearchResults}
              addresses={addresses}
            />
          </div>
        </Visible>
        <div className="chart-wrapper">
          <Visible when={isMobile}>
            <div className="wallet-balance-data">
              <p className="balance"><SvgCoinSymbol/>{`${getBalance()}`}</p>
              <span className="fiat-value">{PLACEHOLDER_USD_VALUE}</span>
            </div>
          </Visible>
          <TransactionChart
            transactions={transactions}
          />
        </div>
        <div className={`list-wrapper${haveTransactions ? '' : '-empty'}`}>
          <div className={isMobile ? `mobile-list` : ''}>
            <Visible
              when={haveTransactions}
              fallback={<NoTransactions formatMessage={formatMessage}/>}
            >
              <TransactionsList
                transactions={transactions}
                onDeselect={onDeselect}
                onRowClick={toggleSidePanel}
                selectedTransaction={selectedTransaction}
              />
            </Visible>
          </div>
        </div>

      </div>
    </Page>
  );
};

TransactionHistoryView.propTypes = {
  addresses: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  setAddresses: PropTypes.func.isRequired,
  setTransactions: PropTypes.func.isRequired,
  setTransactionsSearchResults: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const addresses = getAddresses(state);
  const transactions = getTransactions(state);

  return {
    addresses,
    transactions,
  };
};

const mapDispatchToProps = {
  setAddresses,
  setTransactions,
  setTransactionsSearchResults,
};


export const TransactionHistoryPage = connect(mapStateToProps, mapDispatchToProps) (injectIntl(TransactionHistoryView));
