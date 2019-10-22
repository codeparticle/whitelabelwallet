import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { sortListByDate } from 'lib/utils';

import {
  CustomAmountRenderer,
  CustomDateRenderer,
  CustomDescriptionRenderer,
  CustomTypeRenderer,
  CustomWalletRenderer,
}  from 'plugins/transaction-history/components';


function TransactionsList ({
  transactions,
}) {
  const [listData, setListData] = useState([]);
  const [selectedTransactions, setSelectedTransaction] = useState({});
  const { isMobile } = useMedia();

  useEffect(() => {
    setListData(sortListByDate(transactions));
  }, [transactions, selectedTransactions]);

  const columnDefs = [
    {
      title: 'Date',
      gridColumns: '1/3',
      property: 'created_date',
      customRenderer: CustomDateRenderer,
    },
    {
      title: 'Wallet',
      gridColumns: '4/7',
      property: 'transaction_type',
      customRenderer: CustomWalletRenderer,
    },
    {
      title: 'Details',
      gridColumns: '7/10',
      property: 'description',
    },
    {
      title: 'Amount',
      gridColumns: '11/12',
      property: 'amount',
      customRenderer: CustomAmountRenderer,
    },
  ];

  const mobileColDefs = [
    {
      title: 'type',
      gridColumns: '1 / 3',
      property: 'transaction_type',
      customRenderer: CustomTypeRenderer,
    },
    {
      title: 'Details',
      gridColumns: '4 / 9',
      property: 'description',
      customRenderer: CustomDescriptionRenderer,
    },
    {
      title: 'Amount',
      gridColumns: '10 / 12',
      property: 'amount',
      customRenderer: CustomAmountRenderer,
    },
  ];

  const columns = isMobile ? mobileColDefs : columnDefs;


  return (
    <List
      id="wallet-list"
      isStriped={!isMobile}
      showHeader={!isMobile}
      columnDefs={columns}
      rowData={listData || []}
      onRowClicked={setSelectedTransaction}
    />
  );
}

TransactionsList.prototypes = {
  transactions: PropTypes.array.isRequired,
};

export { TransactionsList };