/**
 * @fileoverview List component that renders wallets
 * @author Gabriel Womble
 */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from '@codeparticle/whitelabelwallet.styleguide';
import { COMMON } from 'translations/keys/common';

import {
  BalanceRenderer,
  ChildCountRenderer,
  FromAddressChildList,
  SendFundsSearch,
} from 'plugins/send-funds/components';
import { getWalletAddresses, getWalletAddressesByValue, resetStateHandler } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { setFromAddress } from 'plugins/send-funds/rdx/actions';

const { SEARCH_PLACEHOLDER } = COMMON;
const { WALLET, BALANCE, SEND_FROM } = SEND_FUNDS;

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

// Fixes a react `invalid prop supplied to warning`.
const childList = props => <FromAddressChildList {...props} />;

function FromAddressListView({ formatMessage, ...props }) {
  const [rowData, setRowData] = useState([]);

  function onRowClicked(data) {
    if (data.addresses.length === 1) {
      props.setFromAddress(data);
    }
  }

  async function onSubmit(value) {
    const res = await getWalletAddressesByValue(value);
    setRowData(res);
  }

  useEffect(() => {
    getWalletAddresses().then((data) => {
      setRowData(data);
    });
  }, [setRowData]);

  return (
    <Fragment>
      <SendFundsSearch
        area="send-from"
        label={formatMessage(SEND_FROM)}
        placeholder={formatMessage(SEARCH_PLACEHOLDER)}
        onSubmit={onSubmit}
      />
      <div className="send-funds-layout__from-address">
        <div className="from-address-list-container">
          <List
            childToRender={childList}
            columnDefs={getColumnDefs(formatMessage)}
            id="from-address-list"
            matchProperty="id"
            rowData={rowData}
            onDeselect={resetStateHandler(props.setFromAddress)}
            onRowClicked={onRowClicked}
          />
          <style jsx>
            {`
              .from-address-list-container {
                height: 100%;
                overflow: hidden;
                width: 100%;
              }
            `}
          </style>
        </div>
      </div>
    </Fragment>
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
