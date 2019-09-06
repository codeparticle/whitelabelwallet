/**
 * @fileoverview Add Contact SidePanel
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import {
  Button,
  Overlay,
  TextArea,
  TextInput,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';
import { VARIANTS } from 'lib/constants';
import { safeString } from 'lib/utils';

import {
  createContactAndUpdateList,
  deleteContactAndUpdateList,
  updateContactAndUpdateList,
} from 'plugins/contacts/helpers';
import { CONTACTS } from 'plugins/contacts/translations/keys';
import { validateContactForm } from './validate-contact-form';
import { FIELDS } from './constants';
import './contact-sidepanel.scss';

import { contacts as e2e } from 'e2e/constants';

const { NAME, ADDRESS, DESCRIPTION } = FIELDS;
const { EDIT, OVERLAY, SIDEPANEL } = VARIANTS;
const { COMMON: { CANCEL } } = TRANSLATION_KEYS;
const { SvgUser } = svgs.icons;

/**
 * Initial input error states
 */
const initialInputErrorState = {
  [NAME]: false,
  [ADDRESS]: false,
};

/**
 * Function that returns sidepanel translations based on type
 * @returns {Object} sidepanelTranslations - header and footer messages
 * @param {string} type - 'add' or 'edit'
 */
function getSidepanelTranslations(type) {
  const headerMessage = type === EDIT
    ? CONTACTS.EDIT_CONTACT
    : CONTACTS.ADD_CONTACT;
  const footerMessage = type === EDIT
    ? CONTACTS.SAVE_CHANGES
    : CONTACTS.CREATE_CONTACT;

  return {
    headerMessage,
    footerMessage,
  };
}

function ContactSidepanel({
  selectedContact,
  formatMessage,
  isOpen,
  manager,
  panelType,
  setContacts,
  setIsOpen,
}) {
  // TODO: Update HEADER component to automatically pass height & width
  const Icon = ({ fill }) => <SvgUser height={130} width={130} fill={fill} />;
  const { isMobile } = useMedia();
  const [contact, setContact] = useState(selectedContact);
  const [inputErrors, setInputErrors] = useState(initialInputErrorState);
  const sidepanelTranslations = getSidepanelTranslations(panelType);
  const panelVariant = isMobile
    ? OVERLAY
    : SIDEPANEL;

  useEffect(() => {
    setContact(selectedContact);
  }, [selectedContact]);

  /**
   * Function called on form submission.
   * Updates or Creates a contact based on panelType.
   * Highlights errors on fields if present.
   */
  function onSubmit() {
    const { name, address } = contact;
    const query = panelType === EDIT
      ? updateContactAndUpdateList
      : createContactAndUpdateList;

    const hasError = validateContactForm({ name, address });
    setInputErrors(hasError || initialInputErrorState);

    if (!hasError) {
      const { description, ...restContact } = contact;

      const escapedContact = {
        ...restContact,
        description: safeString(description),
      };

      query(manager, setContacts, escapedContact).then(onClose);
    }
  }

  function onDelete() {
    const { id } = contact;

    deleteContactAndUpdateList(manager, setContacts, id).then(onClose);
  }

  /**
   * Updates the contact state object based on the field key
   * If an error exists for the field, resets the error state
   * @param {Object} e - the event object
   * @param {string} field - the field key
   */
  function onChange(e, field) {
    if (e) {
      e.preventDefault();
    }

    if (inputErrors[field]) {
      setInputErrors({
        ...inputErrors,
        [field]: false,
      });
    }

    setContact({
      ...contact,
      [field]: e.target.value,
    });
  }

  function onClose() {
    setContact(selectedContact);
    setIsOpen(false);
  }

  return (
    <Overlay
      cancelButtonText={formatMessage(CANCEL)}
      dataSelector={e2e.selectors.sidepanel.raw}
      footerButtonText={formatMessage(sidepanelTranslations.footerMessage)}
      Icon={Icon}
      isOpen={isOpen}
      onCancelClick={onClose}
      onClick={onSubmit}
      onClose={onClose}
      title={formatMessage(sidepanelTranslations.headerMessage)}
      type={panelVariant}
    >
      <div className="contact-sidepanel">
        <div className="contact-sidepanel__text-input">
          <TextInput
            dataSelector={e2e.selectors.nameInput.raw}
            hasError={inputErrors[NAME]}
            label={formatMessage(CONTACTS.LABEL_NAME)}
            value={contact.name}
            onChange={(e) => onChange(e, NAME)}
          />
        </div>
        <div className="contact-sidepanel__text-input">
          <TextInput
            dataSelector={e2e.selectors.addressInput.raw}
            hasError={inputErrors[ADDRESS]}
            label={formatMessage(CONTACTS.LABEL_ADDRESS)}
            value={contact.address}
            onChange={(e) => onChange(e, ADDRESS)}
          />
        </div>
        <div className="contact-sidepanel__text-area">
          <TextArea
            dataSelector={e2e.selectors.descInput.raw}
            label={formatMessage(CONTACTS.LABEL_DESCRIPTION)}
            value={contact.description}
            onChange={(e) => onChange(e, DESCRIPTION)}
          />
        </div>
        <Visible when={panelType === EDIT}>
          <div className="contact-sidepanel__delete">
            <Button
              dataSelector={e2e.selectors.deleteBtn.raw}
              onClick={onDelete}
              variant="alert"
            >
              {formatMessage(CONTACTS.DELETE_CONTACT)}
            </Button>
          </div>
        </Visible>
      </div>
    </Overlay>
  );
}

ContactSidepanel.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  manager: PropTypes.object.isRequired,
  selectedContact: PropTypes.object.isRequired,
  setContacts: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export { ContactSidepanel };
