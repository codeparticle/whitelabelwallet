/**
 * @fileoverview Select from contacts mobile view
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextInput, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { empty } from 'lib/utils';

import { MobileFormButton } from 'plugins/send-funds/components';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import './select-from-contacts.scss';

const iconSize = 20;
const { SvgQrCode } = svgs.icons;
const {
  ENTER_ADDRESS,
  SELECT_FROM_CONTACTS,
  SEND_TO,
} = SEND_FUNDS;

function SelectFromContacts({
  formatMessage,
  onInputChange,
  inputValue,
}) {
  return (
    <MobileFormButton
      btnLabel={formatMessage(SELECT_FROM_CONTACTS)}
      label={formatMessage(SEND_TO)}
      onClick={empty}
      input={
        <div className="select-from-contacts-input">
          <TextInput
            placeholder={formatMessage(ENTER_ADDRESS)}
            onChange={onInputChange}
            value={inputValue}
          />
          <IconButton
            icon={<SvgQrCode height={iconSize} width={iconSize} />}
            onClick={empty}
          />
        </div>
      }
    />
  );
}

SelectFromContacts.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export { SelectFromContacts };
