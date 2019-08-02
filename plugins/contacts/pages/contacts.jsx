import React from 'react';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const Contacts = () => {
  return (
    <div>
      Contacts Page
    </div>
  );
};

Contacts.propTypes = {
};

Contacts.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
});

const ContactsPage = connect(stateMapper, actionsMapper)(Contacts);

export { ContactsPage };
