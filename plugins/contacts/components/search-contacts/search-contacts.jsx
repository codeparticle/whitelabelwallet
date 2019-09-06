/**
 * @fileoverview Search Component for the Contacts Plugin
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@codeparticle/whitelabelwallet.styleguide';
import { searchContactsByValue } from 'plugins/contacts/helpers';
import { CONTACTS } from 'plugins/contacts/translations/keys';

import { contacts as e2e } from 'e2e/constants';

export function SearchContacts({
  formatMessage,
  manager,
  setContacts,
}) {
  function onSubmit(value) {
    searchContactsByValue(manager, setContacts, value);
  }

  return (
    <Search
      dataSelector={e2e.selectors.searchInput.raw}
      onSubmit={onSubmit}
      placeholder={formatMessage(CONTACTS.SEARCH)}
    />
  );
}

SearchContacts.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  manager: PropTypes.object.isRequired,
  setContacts: PropTypes.func.isRequired,
};
