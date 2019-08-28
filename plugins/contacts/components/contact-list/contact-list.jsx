/**
 * @fileoverview Contact List Component for Contacts Page
 * @author Gabriel Womble
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Contact } from '@codeparticle/whitelabelwallet.styleguide';
import { CONTACTS } from 'plugins/contacts/translations/keys';

import './contact-list.scss';

function ContactList({
  contacts,
  formatMessage,
}) {
  const [contactList, setContactList] = useState(contacts);
  const contactMessages = {
    copy: formatMessage(CONTACTS.COPY_ADDRESS),
    send: formatMessage(CONTACTS.SEND_FUNDS),
  };

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  return (
    <div className="contact-list">
      {contactList.map((contact, index) => {
        const { address, name } = contact;

        return (
          <Contact
            key={`contact-${index}`}
            address={address}
            contactName={name}
            messages={contactMessages}
            {...contact}
          />
        );
      })}
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  formatMessage: PropTypes.func.isRequired,
};

ContactList.defaultProps = {
  contacts: [],
};

export { ContactList };
