/**
 * @fileoverview Contact list for send funds
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from '@codeparticle/whitelabelwallet.styleguide';
import { useManager } from 'lib/hooks';

import { TruncatedText } from 'plugins/send-funds/components';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { setToAddress } from 'plugins/send-funds/rdx/actions';

const { RAW_ADDRESS, SAVED_RECIPIENT } = SEND_FUNDS;

function getColumnDefs(formatMessage) {
  return [
    {
      title: formatMessage(SAVED_RECIPIENT),
      gridColumns: '1 / 6',
      property: 'name',
      customRenderer: TruncatedText,
    },
    {
      title: formatMessage(RAW_ADDRESS),
      gridColumns: '7/ 12',
      property: 'address',
      customRenderer: TruncatedText,
    },
  ];
}

async function getRowData(manager) {
  return await manager.databaseManager.getContacts();
}

function ToAddressListView({ formatMessage, ...props }) {
  const [rowData, setRowData] = useState([]);
  const manager = useManager();

  useEffect(() => {
    getRowData(manager).then((data) => {
      setRowData(data);
    });
  }, [setRowData]);

  return (
    <div className="to-address-list-container">
      <List
        allowDeselect={false}
        columnDefs={getColumnDefs(formatMessage)}
        id="to-address-list"
        rowData={rowData}
        onRowClicked={props.setToAddress}
      />
      <style jsx>
        {`
          .to-address-list-container {
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}

ToAddressListView.propTypes = {
  formatMessage: PropTypes.object.isRequired,
  setToAddress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setToAddress,
};

export const ToAddressList = connect(null, mapDispatchToProps)(ToAddressListView);
