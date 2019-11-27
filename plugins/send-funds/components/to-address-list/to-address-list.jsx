/**
 * @fileoverview Contact list for send funds
 * @author Gabriel Womble
 */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from '@codeparticle/whitelabelwallet.styleguide';
import { useUnmount } from 'lib/hooks';

import { TruncatedText, SendFundsSearch } from 'plugins/send-funds/components';
import { getContacts, getContactsByValue, resetStateHandler } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { preSelectToAddress, setToAddress } from 'plugins/send-funds/rdx/actions';
import { getPreSelectedToAddress } from 'plugins/send-funds/rdx/selectors';

const {
  RAW_ADDRESS,
  SAVED_RECIPIENT,
  SEND_TO,
  SEND_TO_PLACEHOLDER,
} = SEND_FUNDS;

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
      gridColumns: '7 / 12',
      property: 'address',
      customRenderer: TruncatedText,
    },
  ];
}

function ToAddressListView({ formatMessage, preSelectedToAddress, ...props }) {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getContacts().then((data) => {
      setRowData(data);
    });
  }, [setRowData]);

  useUnmount(props.preSelectToAddress);

  function onRowClicked(data) {
    const { address } = data;

    props.setToAddress(address);
  }

  function onSubmit(value) {
    getContactsByValue(setRowData, value);
  }

  return (
    <Fragment>
      <SendFundsSearch
        area="send-to"
        label={formatMessage(SEND_TO)}
        placeholder={formatMessage(SEND_TO_PLACEHOLDER)}
        onSubmit={onSubmit}
      />
      <div className="send-funds-layout__to-address">
        <div className="to-address-list-container">
          <List
            columnDefs={getColumnDefs(formatMessage)}
            id="to-address-list"
            matchProperty="id"
            preSelect={preSelectedToAddress}
            rowData={rowData}
            onDeselect={resetStateHandler(props.setToAddress)}
            onRowClicked={onRowClicked}
          />
          <style jsx>
            {`
              .to-address-list-container {
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

ToAddressListView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  preSelectToAddress: PropTypes.func.isRequired,
  preSelectedToAddress: PropTypes.object,
  setToAddress: PropTypes.func.isRequired,
};

ToAddressListView.defaultProps = {
  preSelectedToAddress: null,
};

const mapStateToProps = state => {
  const preSelectedToAddress = getPreSelectedToAddress(state);

  return {
    preSelectedToAddress,
  };
};

const mapDispatchToProps = {
  preSelectToAddress,
  setToAddress,
};

export const ToAddressList = connect(mapStateToProps, mapDispatchToProps)(ToAddressListView);
