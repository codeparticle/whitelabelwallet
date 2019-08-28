/**
 * @fileoverview Search Component for the Contacts Plugin
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@codeparticle/whitelabelwallet.styleguide';
import { CONTACTS } from 'plugins/contacts/translations/keys';

async function searchContactsByName(manager, setFn, value) {
  const res = await manager.databaseManager.getContactsByValue(value);
  setFn(res);
}

export function SearchContacts({
  formatMessage,
  manager,
  setContacts,
}) {
  function onSubmit(name) {
    searchContactsByName(manager, setContacts, name);
  }

  return (
    <Search onSubmit={onSubmit} placeholder={formatMessage(CONTACTS.SEARCH)} />
  );
}

SearchContacts.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  manager: PropTypes.object.isRequired,
  setContacts: PropTypes.func.isRequired,
};
