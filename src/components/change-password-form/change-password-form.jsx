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

function ChangePasswordForm({
  confirmedPassword,
  currentPassword,
  formatMessage,
  inputErrors,
  newPassword,
  onInputChange,
  setConfirmedPassword,
  setCurrentPassword,
  setNewPassword,
}) {
  const [showEditPassword, setShowEditPassword] = useState(false);

  const toggleEditPassword = () => setShowEditPassword(!showEditPassword);
  const onCurrentPasswordChange = (e) => onInputChange(e, setCurrentPassword);
  const onNewPasswordChange = (e) => onInputChange(e, setNewPassword);
  const onConfirmedPasswordChange = (e) => onInputChange(e, setConfirmedPassword);

  return (
    <Fragment>
      <Visible when={showEditPassword}>
        <div className="sidepanel-item">
          <TextInput
            label={formatMessage(CURRENT_PASSWORD)}
            hasError={inputErrors.currentPassword}
            onChange={onCurrentPasswordChange}
            value={currentPassword}
            type="password"
          />
        </div>
        <div className="sidepanel-item">
          <TextInput
            label={formatMessage(NEW_PASSWORD)}
            hasError={inputErrors.newPassword}
            onChange={onNewPasswordChange}
            value={newPassword}
            type="password"
          />
        </div>
        <div className="sidepanel-item">
          <TextInput
            label={formatMessage(CONFIRM_NEW_PASSWORD)}
            hasError={inputErrors.confirmedPassword}
            onChange={onConfirmedPasswordChange}
            value={confirmedPassword}
            type="password"
          />
        </div>
      </Visible>
      <div className="sidepanel-item button">
        <Button
          onClick={toggleEditPassword}
          variant={SECONDARY}
        >
          {formatMessage(SETTINGS.CHANGE_PASSWORD)}
        </Button>
      </div>
      <style jsx>
        {`
          .button {
            display: ${showEditPassword ? 'none' : 'inherit'};
          }
        `}
      </style>
    </Fragment>
  );
}

ChangePasswordForm.propTypes = {
  confirmedPassword: PropTypes.string.isRequired,
  currentPassword: PropTypes.string.isRequired,
  formatMessage: PropTypes.func.isRequired,
  newPassword: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  setConfirmedPassword: PropTypes.func.isRequired,
  setCurrentPassword: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
};

export { ChangePasswordForm };
