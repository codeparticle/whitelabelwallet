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
  setSelectedWalletTransactionsSearchResults,
  selectedWalletAddresses,
}) {
  function onSubmit(value) {
    searchTransactionsByValue(setSelectedWalletTransactionsSearchResults, value, selectedWalletAddresses);
  }

  return (
    <Search
      onSubmit={onSubmit}
      placeholder={formatMessage(SEARCH)}
    />
  );
}

SearchTransactions.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setSelectedWalletTransactionsSearchResults: PropTypes.func.isRequired,
  selectedWalletAddresses: PropTypes.array.isRequired,
};
