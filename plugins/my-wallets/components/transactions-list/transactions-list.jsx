import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { empty } from 'lib/utils';

import {
  CustomAmountRenderer,
  CustomAddressRenderer,
  CustomDateRenderer,
  CustomDescriptionRenderer,
  CustomTypeRenderer,
}  from 'plugins/my-wallets/components';

function TransactionsList ({
  selectedWallet,
  selectedWalletAddresses,
  selectedWalletTransactions,
}) {
  const listData = selectedWalletTransactions;
  const { isMobile } = useMedia();
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

  let columns = selectedWallet.multi_address === 1 ? columnDefs : removeAddressColumn(columnDefs);

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

  columns = isMobile ? mobileColDefs : columns;

  return (
    <List
      id="wallet-list"
      isStriped={!isMobile}
      showHeader={!isMobile}
      columnDefs={columns}
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