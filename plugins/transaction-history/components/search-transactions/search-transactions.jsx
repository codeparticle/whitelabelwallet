/**
 * @fileoverview Search Component for the Wallets Plugin
 * @author Marc Mathieu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@codeparticle/whitelabelwallet.styleguide';
import { searchTransactionsByValue } from 'plugins/transaction-history/helpers';
import { TRANSLATION_KEYS } from 'translations/keys';

const { COMMON: { SEARCH_TRANSACTIONS } } = TRANSLATION_KEYS;


export function SearchTransactions({
  formatMessage,
  setTransactionsSearchResults,
  selectedWalletAddresses,
}) {

  // adjust to work with wallet column instead of addresses column.
  function onSubmit(value) {
    searchTransactionsByValue(setTransactionsSearchResults, value, selectedWalletAddresses);
  }

  return (
    <Search
      onSubmit={onSubmit}
      placeholder={formatMessage(SEARCH_TRANSACTIONS)}
    />
  );
}

SearchTransactions.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setSelectedWalletTransactionsSearchResults: PropTypes.func.isRequired,
  selectedWalletAddresses: PropTypes.array.isRequired,
};
