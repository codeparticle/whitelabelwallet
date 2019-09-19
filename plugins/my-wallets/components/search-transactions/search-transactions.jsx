/**
 * @fileoverview Search Component for the Wallets Plugin
 * @author Marc Mathieu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@codeparticle/whitelabelwallet.styleguide';
import { searchTransactionsByValue } from 'plugins/contacts/helpers';


export function SearchTransactions({
  setTransactions,
}) {
  function onSubmit(value) {
    searchTransactionsByValue(setTransactions, value);
  }

  return (
    <Search
      onSubmit={onSubmit}
      placeholder={'Replace Me'}
    />
  );
}

SearchTransactions.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setContacts: PropTypes.func.isRequired,
};
