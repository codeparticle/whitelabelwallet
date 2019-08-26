import { defineMessages } from 'react-intl';

export const CONTACTS = defineMessages({
  TITLE: {
    id: 'plugin.contacts.nav_item',
    description: 'Page Header title for Contacts page',
    defaultMessage: 'Contacts',
  },
  ADD_CONTACT: {
    id: 'plugin.contacts.add_contact',
    description: 'Add contact button text',
    defaultMessage: 'Add Contact',
  },
  COPY_ADDRESS: {
    id: 'plugin.contacts.copy_address',
    description: 'Contact component copy text',
    defaultMessage: 'Copy Address',
  },
  SEND_FUNDS: {
    id: 'plugin.contacts.send_funds',
    description: 'Contact component send text',
    defaultMessage: 'Send Funds',
  },
  SEARCH: {
    id: 'plugin.contacts.search',
    description: 'Search component placeholder text',
    defaultMessage: 'Search Contacts...',
  },
});
