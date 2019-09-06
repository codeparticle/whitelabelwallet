/**
 * @fileoverview Contacts Plugin Base Page
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { HeaderButton, IconButton, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { Visible } from '@codeparticle/react-visible';
import { VARIANTS } from 'lib/constants';
import { useManager } from 'lib/hooks';
import { Page } from 'components';

import { CONTACTS } from 'plugins/contacts/translations/keys';
import { ContactSidepanel, ContactList, SearchContacts } from 'plugins/contacts/components';
import { setContacts } from 'plugins/contacts/rdx/actions';
import { fetchContacts } from 'plugins/contacts/helpers';
import { getContacts } from 'plugins/contacts/rdx/selectors';

import { contacts as e2e } from 'e2e/constants';

const { ADD } = VARIANTS;
const { SvgAdd } = svgs.icons;

/**
 * Initial Contact Object shape
 */
const initialSelectedContact = {
  name: '',
  address: '',
  description: '',
};

const ContactsPageView = ({
  contacts,
  intl,
  ...props
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelType, setPanelType] = useState(ADD);
  const [selectedContact, setSelectedContact] = useState(initialSelectedContact);
  const { formatMessage } = intl;
  const manager = useManager();

  useEffect(() => {
    fetchContacts(manager, props.setContacts);
  }, [props.setContacts]);

  /**
   * Function sets sidepanel data, and then opens the sidepanel
   * @param {string} type - add || edit
   * @param {Object} contact - required for type edit
   */
  function openPanel(type, contact = initialSelectedContact) {
    setSelectedContact(contact);
    setPanelType(type);
    setIsPanelOpen(true);
  }

  const onAdd = () => openPanel(ADD);

  /**
   * Button that triggers the Add Contact sidepanel
   * Only visible when PageHeader isn't collapsed
   */
  function AddContactButton() {
    return (
      <HeaderButton
        dataSelector={e2e.selectors.addBtn.raw}
        Icon={SvgAdd}
        label={formatMessage(CONTACTS.ADD_CONTACT)}
        onClick={onAdd}
      />
    );
  }

  /**
 * IconButton that triggers the Add Contact sidepanel
 * @returns {Node} AddContactIcon
 * @param {boolean} collapsed - boolean received from PageHeader
 * @param {Object} IconProps - height and width for icon, received from PageHeader
 */
  function AddContactIcon({
    collapsed,
    iconProps,
  }) {
    return (
      <Visible when={collapsed}>
        <IconButton
          dataSelector={e2e.selectors.addBtn.raw}
          onClick={onAdd}
          icon={<SvgAdd {...iconProps}/>}
        />
      </Visible>
    );
  }

  return (
    <Page
      dataSelector={e2e.selectors.page.raw}
      headerProps={{
        dataSelector: e2e.selectors.header.raw,
        PrimaryAction: AddContactIcon,
        SecondaryAction: AddContactButton,
        title: formatMessage(CONTACTS.TITLE),
      }}
    >
      <SearchContacts
        formatMessage={formatMessage}
        manager={manager}
        setContacts={props.setContacts}
      />
      <ContactList
        contacts={contacts}
        formatMessage={formatMessage}
        openPanel={openPanel}
        manager={manager}
      />
      <ContactSidepanel
        selectedContact={selectedContact}
        formatMessage={formatMessage}
        isOpen={isPanelOpen}
        manager={manager}
        panelType={panelType}
        setIsOpen={setIsPanelOpen}
        setContacts={props.setContacts}
      />
    </Page>
  );
};

ContactsPageView.propTypes = {
  contacts: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  setContacts: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setContacts,
};

const mapStateToProps = (state) => {
  const contacts = getContacts(state);

  return {
    contacts,
  };
};

const ContactsPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(ContactsPageView));
export { ContactsPage };
