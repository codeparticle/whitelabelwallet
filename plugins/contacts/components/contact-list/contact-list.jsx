/**
 * @fileoverview Contact List Component for Contacts Page
 * @author Gabriel Womble
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Contact } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { empty, unescape } from 'lib/utils';

import { CONTACTS } from 'plugins/contacts/translations/keys';
import { contacts as e2e } from 'e2e/constants';
import './contact-list.scss';

const { EDIT } = VARIANTS;

function ContactList({
  contacts,
  openPanel,
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
    <div className="contact-list" data-selector={e2e.selectors.contactList.raw}>
      {contactList.map((contact, index) => {
        const { address, description, name } = contact;
        const onEdit = () => {
          const rawContact = {
            ...contact,
            description: unescape(description),
          };

          openPanel(EDIT, rawContact);
        };

        return (
          <Contact
            key={`contact-${index}`}
            address={address}
            dataSelector={e2e.selectors.contact.raw}
            contactName={name}
            messages={contactMessages}
            onEdit={onEdit}
            onSend={empty}
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
