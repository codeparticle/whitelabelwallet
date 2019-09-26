import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from '@codeparticle/whitelabelwallet.styleguide';
import { empty } from 'lib/utils';

import {
  CustomAmountRenderer,
  CustomAddressRenderer,
  CustomDateRenderer,
}  from 'plugins/my-wallets/components';

function TransactionsList ({
  selectedWallet,
  selectedWalletAddresses,
  selectedWalletTransactions,
}) {
  const listData = selectedWalletTransactions.reverse();
  function addressRenderer ({ data }) {
    return (
      <CustomAddressRenderer
        data={data}
        addresses={selectedWalletAddresses} />
    );
  }

  const removeAddressColumn = (columns) => {
    columns.splice(1, 1);
    return columns;
  };

  const columnDefs = [
    {
      title: 'Date',
      gridColumns: '1 / 3',
      property: 'created_date',
      customRenderer: CustomDateRenderer,
    },
    {
      title: 'Address',
      gridColumns: '4 / 7',
      property: 'transaction_type',
      customRenderer:  addressRenderer,
    },
    {
      title: 'Details',
      gridColumns: '7 / 10',
      property: 'description',
    },
    {
      title: 'Amount',
      gridColumns: '12',
      property: 'amount',
      customRenderer: CustomAmountRenderer,
    },
  ];

  return (
    <List
      id="wallet-list"
      isStriped
      columnDefs={selectedWallet.multi_address === 1 ? columnDefs : removeAddressColumn(columnDefs)}
      rowData={listData}
      onRowClicked={empty}
    />
  );
}

TransactionsList.prototypes = {
  selectedWalletAddresses: PropTypes.array.isRequired,
  selectedWalletTransactions: PropTypes.array.isRequired,
  selectedWallet: PropTypes.object.isRequired,
};

export { TransactionsList };