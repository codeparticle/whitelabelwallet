/**
 * @fileoverview Contact List Component for Contacts Page
 * @author Gabriel Womble
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Contact } from '@codeparticle/whitelabelwallet.styleguide';
import { ROUTES, VARIANTS } from 'lib/constants';
import { unescape } from 'lib/utils';

import { preSelectToAddress } from 'plugins/send-funds/rdx/actions';

import { CONTACTS } from 'plugins/contacts/translations/keys';
import { contacts as e2e } from 'e2e/constants';
import './contact-list.scss';

const { SEND_FUNDS } = ROUTES;
const { EDIT } = VARIANTS;

function ContactListView({
  contacts,
  history,
  openPanel,
  formatMessage,
  ...props
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
        const { address, description, name, id } = contact;
        const onEdit = () => {
          const rawContact = {
            ...contact,
            description: unescape(description),
          };

          openPanel(EDIT, rawContact);
        };

        const onSend = () => {
          props.preSelectToAddress({
            id,
            data: contact,
          });

          history.push(`/${SEND_FUNDS}`);
        };

        return (
          <Contact
            key={`contact-${index}`}
            address={address}
            dataSelector={e2e.selectors.contact.raw}
            contactName={name}
            messages={contactMessages}
            onEdit={onEdit}
            onSend={onSend}
            {...contact}
          />
        );
      })}
    </div>
  );
}

ContactListView.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object.isRequired,
  formatMessage: PropTypes.func.isRequired,
  preSelectToAddress: PropTypes.func.isRequired,
};

ContactListView.defaultProps = {
  contacts: [],
};

const mapDispatchToProps = {
  preSelectToAddress,
};

export const ContactList = connect(null, mapDispatchToProps)(withRouter(ContactListView));
