import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import { Page } from 'components';
import { getSelectOptions } from 'lib/utils';
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
} from 'plugins/transaction-history/components';
import {
  getAddresses,
  getTransactions,
} from 'plugins/transaction-history/rdx/selectors';
import { COMMON } from 'translations/keys/common';
import { TRANSACTION_HISTORY } from 'plugins/transaction-history/translations/keys';
import {
  Select,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import './transaction-history.scss';

const { ALL_TIME } = COMMON;
const { NAV_ITEM } = TRANSACTION_HISTORY;

const TransactionHistoryView = ({
  addresses,
  intl: {
    formatMessage,
  },
  transactions,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(getDateValue());
  const [previousSelectedDate, setPreviousSelectedData] = useState(selectedDate);
  const { isMobile } = useMedia();
  const haveTransactions =  transactions.length > 0;

  useEffect(() => {
    fetchTransactions(props.setTransactions);
  }, [props.setTransactions]);

  useEffect(() => {
    fetchAddresses(props.setAddresses);
  }, [props.setAddresses]);

  useEffect(() => {
    if (previousSelectedDate !== selectedDate) {
      setPreviousSelectedData(selectedDate);
    }
  }, [selectedDate]);


  function getDateValue(desiredDate = ALL_TIME) {
    let queryDate = null;

    if (desiredDate !== ALL_TIME) {
      queryDate = moment().startOf(desiredDate).format('YYYY-MM-DD');
    }

    return queryDate;
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

  };

  return (
    <Page
      headerProps={{
        title: formatMessage(NAV_ITEM),
        SecondaryAction,
      }}
      removePadding
      className={'transaction-history-page'}
    >
      <div className="page-content-container">
        <Visible when={!isMobile}>
          <div className="search-wrapper">
            <SearchTransactions
              formatMessage={formatMessage}
              setTransactionsSearchResults={props.setTransactionsSearchResults}
              addresses={addresses}
            />
          </div>
        </Visible>
        <div className="chart-wrapper">
          <TransactionChart
            transactions={transactions}
          />
        </div>
        <div className={`list-wrapper${haveTransactions ? '' : '-empty'}`}>
          <div className={isMobile ? `mobile-list` : ''}>
            <Visible when={haveTransactions}>
              <TransactionsList transactions={transactions} />
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
