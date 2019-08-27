/**
 * @fileoverview Add Contact SidePanel
 * TODO: Refactor to handle editing via type prop (when working on EDIT CONTACT TASK)
 * @author Gabriel Womble
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  TextArea,
  TextInput,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';
import { CONTACTS } from 'plugins/contacts/translations/keys';
import { validateContactForm } from './validate-contact-form';
import { FIELDS } from './constants';
import './add-contact.scss';

const { NAME, ADDRESS } = FIELDS;
const { COMMON: { CANCEL } } = TRANSLATION_KEYS;
const { SvgAddUser } = svgs.icons;

async function createContactAndUpdateList(contact, manager, setFn) {
  await manager.databaseManager.insert().contact(contact);
  await manager.saveDatabase();

  const res = await manager.databaseManager.getContacts();
  setFn(res);

  return true;
}

const initialInputErrorState = {
  [NAME]: false,
  [ADDRESS]: false,
};

function AddContact({
  formatMessage,
  isOpen,
  manager,
  setContacts,
  setIsOpen,
}) {
  // TODO: Update HEADER component to automatically pass height & width
  const Icon = ({ fill }) => <SvgAddUser height={130} width={130} fill={fill} />;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [inputErrors, setInputErrors] = useState(initialInputErrorState);

  function onSubmit() {
    const contact = {
      name,
      address,
      description,
    };

    const hasError = validateContactForm({ name, address });
    setInputErrors(hasError || initialInputErrorState);

    if (!hasError) {
      createContactAndUpdateList(contact, manager, setContacts).then(onClose);
    }
  }

  function onChange(e, setFn, field = null) {
    if (e) {
      e.preventDefault();
    }

    if (field && inputErrors[field]) {
      setInputErrors({
        ...inputErrors,
        [field]: false,
      });
    }

    setFn(e.target.value);
  }

  function onClose() {
    [setName, setAddress, setDescription].forEach((fn) => fn(''));
    setIsOpen(false);
  }

  return (
    <Overlay
      cancelButtonText={formatMessage(CANCEL)}
      footerButtonText={formatMessage(CONTACTS.CREATE_CONTACT)}
      Icon={Icon}
      isOpen={isOpen}
      onCancelClick={onClose}
      onClick={onSubmit}
      onClose={onClose}
      title={formatMessage(CONTACTS.ADD_CONTACT)}
      type="sidepanel"
    >
      <div className="add-contact">
        <div className="no-flex">
          <TextInput
            hasError={inputErrors[NAME]}
            label={formatMessage(CONTACTS.LABEL_NAME)}
            value={name}
            onChange={(e) => onChange(e, setName, NAME)}
          />
          <TextInput
            hasError={inputErrors[ADDRESS]}
            label={formatMessage(CONTACTS.LABEL_ADDRESS)}
            value={address}
            onChange={(e) => onChange(e, setAddress, ADDRESS)}
          />
        </div>
        <TextArea
          label={formatMessage(CONTACTS.LABEL_DESCRIPTION)}
          value={description}
          onChange={(e) => onChange(e, setDescription)}
        />
      </div>
    </Overlay>
  );
}

AddContact.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  manager: PropTypes.object.isRequired,
  setContacts: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export { AddContact };
