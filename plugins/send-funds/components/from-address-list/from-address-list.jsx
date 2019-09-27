/**
 * @fileoverview List component that renders wallets
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from '@codeparticle/whitelabelwallet.styleguide';
import { useManager } from 'lib/hooks';

import {
  BalanceRenderer,
  ChildCountRenderer,
  FromAddressChildList,
} from 'plugins/send-funds/components';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { setFromAddress } from 'plugins/send-funds/rdx/actions';

const { WALLET, BALANCE } = SEND_FUNDS;

function getColumnDefs(formatMessage) {
  return [
    {
      title: formatMessage(WALLET),
      gridColumns: '1 / 7',
      property: 'name',
      customRenderer: ChildCountRenderer,
    },
    {
      title: formatMessage(BALANCE),
      gridColumns: '8 / 12',
      property: 'name',
      customRenderer: BalanceRenderer,
    },
  ];
}

async function getRowData(manager) {
  return await manager.databaseManager.getWalletAddresses();
}

function FromAddressListView({ formatMessage, ...props }) {
  const [rowData, setRowData] = useState([]);
  const manager = useManager();

  function onRowClicked(data) {
    if (data.addresses.length === 1) {
      props.setFromAddress(data);
    }
  }

  useEffect(() => {
    getRowData(manager).then((data) => {
      setRowData(data);
    });
  }, [setRowData]);

  return (
    <div className="from-address-list-container">
      <List
        allowDeselect={false}
        childToRender={FromAddressChildList}
        columnDefs={getColumnDefs(formatMessage)}
        id="from-address-list"
        rowData={rowData}
        onRowClicked={onRowClicked}
      />
      <style jsx>
        {`
          .from-address-list-container {
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}

FromAddressListView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setFromAddress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setFromAddress,
};

export const FromAddressList = connect(null, mapDispatchToProps)(FromAddressListView);
