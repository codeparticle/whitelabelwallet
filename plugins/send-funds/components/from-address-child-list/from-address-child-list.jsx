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

function FromAddressChildListView({ data, onClick, ...props }) {
  const { addresses = [] } = data;
  const setToState = onClick || props.setFromAddress;
  const shouldShowSubList = addresses.length > 1;

  function onRowClicked(data) {
    const { address } = data;

    setToState(address);
  }

  return (
    <Visible when={shouldShowSubList}>
      <List
        columnDefs={columnDefs}
        customRowStyles={getRowStyles}
        id="from-address-child-list"
        matchProperty="id"
        rowData={addresses}
        onDeselect={resetStateHandler(setToState)}
        onRowClicked={onRowClicked}
        showHeader={false}
      />
    </Visible>
  );
}

FromAddressChildListView.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  setFromAddress: PropTypes.func.isRequired,
};

FromAddressChildListView.defaultProps = {
  onClick: null,
};

const mapDispatchToProps = {
  setFromAddress,
};

const FromAddressChildList = connect(null, mapDispatchToProps)(FromAddressChildListView);

export { FromAddressChildList };
