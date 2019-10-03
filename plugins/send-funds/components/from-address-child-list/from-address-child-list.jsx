/**
 * @fileoverview Sub list view for send funds from address list
 * @author Gabriel Womble
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { List } from '@codeparticle/whitelabelwallet.styleguide';

import { ChildItemRenderer } from 'plugins/send-funds/components';
import { resetStateHandler } from 'plugins/send-funds/helpers';
import { setFromAddress } from 'plugins/send-funds/rdx/actions';

const columnDefs = [
  {
    title: 'address_name',
    gridColumns: '1 / 7',
    property: 'name',
    customRenderer: ChildItemRenderer,
  },
  {
    title: 'address_balance',
    gridColumns: '8 / 12',
    property: 'balance',
  },
];

function getRowStyles({ isSelected, theme }) {
  if (isSelected) {
    return theme.subItemSelected;
  }

  return theme.subItem;
}

function FromAddressChildListView({ data, ...props }) {
  const { addresses = [] } = data;
  const shouldShowSubList = addresses.length > 1;

  function onRowClicked(data) {
    const { address } = data;

    props.setFromAddress(address);
  }

  return (
    <Visible when={shouldShowSubList}>
      <List
        columnDefs={columnDefs}
        customRowStyles={getRowStyles}
        id="from-address-child-list"
        matchProperty="id"
        rowData={addresses}
        onDeselect={resetStateHandler(props.setFromAddress)}
        onRowClicked={onRowClicked}
        showHeader={false}
      />
    </Visible>
  );
}

FromAddressChildListView.propTypes = {
  data: PropTypes.object.isRequired,
  setFromAddress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setFromAddress,
};

const FromAddressChildList = connect(null, mapDispatchToProps)(FromAddressChildListView);

export { FromAddressChildList };
