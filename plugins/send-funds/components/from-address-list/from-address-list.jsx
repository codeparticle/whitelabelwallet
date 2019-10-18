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

function FromAddressListView({ formatMessage, onClick, searchLabel, ...props }) {
  const [rowData, setRowData] = useState([]);
  const setToState = onClick || props.setFromAddress;

  const childList = props => <FromAddressChildList onClick={onClick} {...props} />;

  function onRowClicked(data) {
    if (data.addresses.length === 1) {
      const [{ address }] = data.addresses;

      setToState(address);
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
        label={searchLabel || formatMessage(SEND_FROM)}
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
            onDeselect={resetStateHandler(setToState)}
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
  onClick: PropTypes.func,
  setFromAddress: PropTypes.func.isRequired,
  searchLabel: PropTypes.string,
};

FromAddressListView.defaultProps = {
  onClick: null,
  searchLabel: null,
};

const mapDispatchToProps = {
  setFromAddress,
};

export const FromAddressList = connect(null, mapDispatchToProps)(FromAddressListView);
