/**
 * @fileoverview AuthForm for auth page.
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import { TextInput, LabeledCheckbox } from '@codeparticle/whitelabelwallet.styleguide';
import { white } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';
import { space2, space4 } from '@codeparticle/whitelabelwallet.styleguide/styles/layout.scss';
import { AUTH_CONSTANTS } from 'lib/constants';
import { auth } from 'e2e/constants';

const { SIGNUP, TOS } = AUTH_CONSTANTS;

export function AuthForm({
  accepted,
  confirmPassword,
  inputErrors,
  password,
  onSubmit,
  setAccepted,
  setConfirmPassword,
  setPassword,
  setUsername,
  messages,
  type,
  username,
}) {
  function onChangeHandler(e, fn) {
    if (e) {
      e.preventDefault();
    }

    fn(e.target.value);
  }

  return (
    <form onSubmit={onSubmit} data-selector={`auth.form-${type}`}>
      <TextInput
        className="auth-form-input"
        dataSelector={auth.selectors.username.raw}
        hasError={inputErrors.USERNAME}
        label={messages.username}
        useAltTheme
        onChange={(e) => onChangeHandler(e, setUsername)}
        value={username}
      />
      <TextInput
        className="auth-form-input"
        dataSelector={auth.selectors.password.raw}
        hasError={inputErrors.PASSWORD}
        type="password"
        useAltTheme
        label={messages.password}
        onChange={(e) => onChangeHandler(e, setPassword)}
        value={password}
      />
      <Visible when={type === SIGNUP}>
        <TextInput
          className="auth-form-input"
          dataSelector={auth.selectors.confirm.raw}
          hasError={inputErrors.CONFIRMED_PASSWORD}
          type="password"
          useAltTheme
          label={messages.confirmPassword}
          onChange={(e) => onChangeHandler(e, setConfirmPassword)}
          value={confirmPassword}
        />
        <div className="checkbox-container">
          <LabeledCheckbox
            checked={accepted}
            dataSelector={auth.selectors.tos.raw}
            label={
              <FormattedMessage
                {...messages.tosPrompt}
                values={{
                  tosLink: <Link to={`/${SIGNUP}/${TOS}`}>{messages.tos}</Link>,
                }}
              />
            }
            id="tos-link"
            onChange={setAccepted}
          />
        </div>
      </Visible>
      <input className="hidden" type="submit" />
      <style jsx>
        {`
          form {
            margin-top: ${space4};
            width: 100%;
          }

          :global(.auth-form-input) {
            margin: ${space2} 0;
          }

          .hidden {
            display: none;
          }

          .checkbox-container {
            display: flex;
            width: 100%;
          }

          :global(.checkbox-container a) {
            color: ${white};
          }
        `}
      </style>
    </form>
  );
}

AuthForm.propTypes = {
  confirmPassword: PropTypes.string.isRequired,
  inputErrors: PropTypes.objectOf(PropTypes.bool).isRequired,
  messages: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};