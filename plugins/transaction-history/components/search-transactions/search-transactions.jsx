/**
 * @fileoverview Search Component for the Wallets Plugin
 * @author Marc Mathieu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@codeparticle/whitelabelwallet.styleguide';
import { searchTransactionsAndWalletsByValue } from 'plugins/transaction-history/helpers';
import { TRANSLATION_KEYS } from 'translations/keys';

const { COMMON: { SEARCH_TRANSACTIONS } } = TRANSLATION_KEYS;


export function SearchTransactions({
  formatMessage,
  setTransactionsSearchResults,
  addresses,
}) {

  function onSubmit(value) {
    searchTransactionsAndWalletsByValue(setTransactionsSearchResults, value, addresses);
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
  setTransactionsSearchResults: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
};
