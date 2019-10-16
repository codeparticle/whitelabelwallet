import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import { Page } from 'components';
import { getSelectOptions } from 'lib/utils';
import { fetchTransactions } from 'plugins/transaction-history/helpers';
import { setTransactions } from 'plugins/transaction-history/rdx/actions';
import { SearchTransactions, TransactionChart } from 'plugins/transaction-history/components';
import {
  getTransactions,
} from 'plugins/transaction-history/rdx/selectors';
import { COMMON } from 'translations/keys/common';
import {
  Select,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import './transaction-history.scss';

const { ALL_TIME } = COMMON;

const TransactionHistoryView = ({
  intl: {
    formatMessage,
  },
  transactions,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(getDateValue());
  const [previousSelectedDate, setPreviousSelectedData] = useState(selectedDate);
  const { isMobile } = useMedia();

  useEffect(() => {
    fetchTransactions(props.setTransactions);
  }, [props.setTransactions]);

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
        title: 'Replace Me ',
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
              setSelectedWalletTransactionsSearchResults={props.setTransactions}
              selectedWalletAddresses={[]}
            />
          </div>
          <div className="chart-wrapper">
            <TransactionChart
              transactions={transactions}
            />
          </div>
        </Visible>
      </div>
    </Page>
  );
};

TransactionHistoryView.propTypes = {
  intl: intlShape.isRequired,
  setTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const transactions = getTransactions(state);

  return {
    transactions,
  };
};

const mapDispatchToProps = {
  setTransactions,
};


export const TransactionHistoryPage = connect(mapStateToProps, mapDispatchToProps) (injectIntl(TransactionHistoryView));
