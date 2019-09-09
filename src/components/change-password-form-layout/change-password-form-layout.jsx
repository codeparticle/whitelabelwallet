/**
 * @fileoverview Change password form used in settings sidepanel
 * @author Gabriel Womble
 */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { Button, TextInput } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';

const { SECONDARY } = VARIANTS;
const { SETTINGS } = TRANSLATION_KEYS;
const {
  CONFIRM_NEW_PASSWORD,
  CURRENT_PASSWORD,
  NEW_PASSWORD,
} = SETTINGS;

function ChangePasswordFormLayout({
  formatMessage,
  inputErrors,
  passwordFields,
  setPasswordFields,
}) {
  const [showEditPassword, setShowEditPassword] = useState(false);

  const toggleEditPassword = () => setShowEditPassword(!showEditPassword);

  function onChange(e) {
    if (e) {
      e.preventDefault();
    }

    setPasswordFields({
      ...passwordFields,
      [e.target.name]: e.target.value,
    });
  }

  const inputFields = [
    {
      key: 'currentPassword',
      label: CURRENT_PASSWORD,
    },
    {
      key: 'newPassword',
      label: NEW_PASSWORD,
    },
    {
      key: 'confirmedPassword',
      label: CONFIRM_NEW_PASSWORD,
    },
  ];

  return (
    <Fragment>
      <Visible when={showEditPassword}>
        {inputFields.map(({ key, label }) => (
          <div className="sidepanel-item" key={key}>
            <TextInput
              name={key}
              label={formatMessage(label)}
              hasError={inputErrors[key]}
              onChange={onChange}
              value={passwordFields[key]}
              type="password"
            />
          </div>
        ))}
      </Visible>
      <div className="sidepanel-item change-password-button">
        <Button
          onClick={toggleEditPassword}
          variant={SECONDARY}
        >
          {formatMessage(SETTINGS.CHANGE_PASSWORD)}
        </Button>
      </div>
      <style jsx>
        {`
          .change-password-button {
            display: ${showEditPassword ? 'none' : 'inherit'};
          }
        `}
      </style>
    </Fragment>
  );
}

ChangePasswordFormLayout.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  inputErrors: PropTypes.object.isRequired,
  passwordFields: PropTypes.object.isRequired,
  setPasswordFields: PropTypes.func.isRequired,
};

export { ChangePasswordFormLayout };
