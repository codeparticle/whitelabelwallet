/**
 * @fileoverview Search Component for the Wallets Plugin
 * @author Marc Mathieu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@codeparticle/whitelabelwallet.styleguide';
import { searchTransactionsByValue } from 'plugins/my-wallets/helpers';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';

const { SEARCH } = MY_WALLETS;


export function SearchTransactions({
  formatMessage,
  setSelectedWalletTransactions,
  selectedWalletAddresses,
}) {
  function onSubmit(value) {
    searchTransactionsByValue(setSelectedWalletTransactions, value, selectedWalletAddresses);
  }

  return (
    <Search
      onSubmit={onSubmit}
      placeholder={formatMessage(SEARCH)}
    />
  );
}

SearchTransactions.propTypes = {
  manager: PropTypes.object.isRequired,
  setSelectedWalletTransactions: PropTypes.func.isRequired,
  selectedWalletAddresses: PropTypes.array.isRequired,
};
