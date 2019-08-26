/**
 * @fileoverview Contacts Plugin Base Page
 * @author Gabriel Womble
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Icon, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { Visible } from '@codeparticle/react-visible';
import { useManager } from 'lib/hooks';
import { empty } from 'lib/utils';
import { Page, HeaderButton } from 'components';

import { CONTACTS } from 'plugins/contacts/translations/keys';
import { ContactList, SearchContacts } from 'plugins/contacts/components';
import { setContacts } from 'plugins/contacts/rdx/actions';
import { getContacts } from 'plugins/contacts/rdx/selectors';

const { SvgAdd } = svgs.icons;

async function fetchContacts(manager, setFn) {
  const res = await manager.databaseManager.getContacts();
  setFn(res);
}

function AddContactIcon({
  collapsed,
  iconProps,
}) {
  return (
    <Visible when={collapsed}>
      <Icon onClick={empty} icon={<SvgAdd {...iconProps} />} />
    </Visible>
  );
}

const ContactsPageView = ({
  contacts,
  intl,
  ...props
}) => {
  const { formatMessage } = intl;
  const manager = useManager();

  useEffect(() => {
    fetchContacts(manager, props.setContacts);
  }, [props.setContacts]);

  function AddContactButton() {
    return (
      <HeaderButton
        Icon={SvgAdd}
        label={formatMessage(CONTACTS.ADD_CONTACT)}
        onClick={empty}
      />
    );
  }

  return (
    <Page headerProps={{
      PrimaryAction: AddContactIcon,
      SecondaryAction: AddContactButton,
      title: formatMessage(CONTACTS.TITLE),
    }}>
      <SearchContacts
        formatMessage={formatMessage}
        manager={manager}
        setContacts={props.setContacts}
      />
      <ContactList
        contacts={contacts}
        formatMessage={formatMessage}
        manager={manager}
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
