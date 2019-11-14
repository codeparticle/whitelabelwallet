/**
 * @fileoverview Change password form used in settings sidepanel
 * @author Gabriel Womble
 */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { Button, TextInput } from '@codeparticle/whitelabelwallet.styleguide';
import { spacingSm } from '@codeparticle/whitelabelwallet.styleguide/styles/layout.scss';
import { LogoutButton } from 'components';
import { VARIANTS } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';
import { settings as e2e } from 'e2e/constants';

const { SECONDARY, SLATE } = VARIANTS;
const { COMMON, SETTINGS } = TRANSLATION_KEYS;
const {
  CHANGE_PASSWORD,
  CONFIRM_NEW_PASSWORD,
  CURRENT_PASSWORD,
  NEW_PASSWORD,
} = SETTINGS;
const { CANCEL } = COMMON;

function ChangePasswordFormLayout({
  formatMessage,
  inputErrors,
  isMobile,
  passwordFields,
  setPasswordFields,
}) {
  const [showEditPassword, setShowEditPassword] = useState(false);
  const buttonVariant = isMobile ? SLATE : SECONDARY;

  const toggleEditPassword = () => setShowEditPassword(!showEditPassword);
  const btnMessage = showEditPassword
    ? CANCEL
    : CHANGE_PASSWORD;

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
              dataSelector={e2e.selectors[key].raw}
              hasError={inputErrors[key]}
              label={formatMessage(label)}
              name={key}
              onChange={onChange}
              type="password"
              value={passwordFields[key]}
            />
          </div>
        ))}
      </Visible>
      <div className="sidepanel-item settings-buttons">
        <Button
          dataSelector={e2e.selectors.changePassword.raw}
          onClick={toggleEditPassword}
          variant={buttonVariant}
          size={isMobile ? 'full' : ''}
        >
          {formatMessage(btnMessage)}
        </Button>
        <Visible when={!showEditPassword}>
          <div className="logout-button">
            <LogoutButton />
          </div>
        </Visible>
        <style jsx>
          {`
            .settings-buttons {
              display: flex;
              flex-direction: ${isMobile ? 'column' : 'row'};
              justify-content: ${isMobile ? 'initial' : 'flex-end'};
            }

            .logout-button {
              ${isMobile ? 'margin-top' : 'margin-left'}: ${spacingSm};
            }
          `}
        </style>
      </div>
    </Fragment>
  );
}

ChangePasswordFormLayout.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  inputErrors: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  passwordFields: PropTypes.object.isRequired,
  setPasswordFields: PropTypes.func.isRequired,
};

export { ChangePasswordFormLayout };
