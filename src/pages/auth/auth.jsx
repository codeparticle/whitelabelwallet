import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Logo, svgs, FlashAlert } from '@codeparticle/whitelabelwallet.styleguide';
import { useManager } from 'lib/hooks';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { auth } from 'e2e/constants';

import { getUserSettingsAndUpdateState } from './queries';
import { AuthForm, AuthButtons } from './components';
import { getTranslations, getType, validateAuth } from './utils';
import './auth.scss';

const { SvgPoweredBy } = svgs.icons;

const initialInputErrorState = {
  USERNAME: false,
  PASSWORD: false,
  CONFIRMED_PASSWORD: false,
};

const initialErrorState = {
  message: '',
  show: false,
};

const flashDuration = 3000;

function AuthView({
  authToken,
  history,
  intl,
  match,
  setAuthToken,
  setSettings,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [validation, setValidation] = useState(null);
  const [errorState, setErrorState] = useState(initialErrorState);
  const [inputErrorState, setInputErrorState] = useState(initialInputErrorState);
  const manager = useManager();
  const type = getType(match.path);
  const messages = getTranslations(intl.formatMessage, type);
  const svgAlignment = errorState.show ? 'center' : 'end';

  useEffect(() => {
    if (authToken) {
      history.push('/');
    }
  }, [authToken]);

  useEffect(() => {
    if (validation) {
      if (typeof validation === 'string') {
        getUserSettingsAndUpdateState(manager, setSettings).then(() => {
          setAuthToken(validation);
        });
      } else {
        const {
          message,
          messageData = {},
          inputErrors = false,
        } = validation;
        const formattedMessage = intl.formatMessage(message, { ...messageData });

        if (inputErrors) {
          setInputErrorState(inputErrors);
        }

        setErrorState({
          show: true,
          message: formattedMessage,
        });
      }

      setValidation(null);
    }
  }, [validation]);

  useEffect(() => {
    if (errorState.show) {
      setTimeout(() => {
        setInputErrorState(initialInputErrorState);
        setErrorState(initialErrorState);
      }, flashDuration);
    }
  }, [errorState]);

  async function onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const validated = await validateAuth({
      username,
      password,
      confirmPassword,
      accepted,
      type,
      manager,
      intl,
    });

    setValidation(validated);
  };

  return (
    <div
      className="auth-page-container"
      data-selector={auth.selectors.page.raw}
    >
      <div className="auth-page-container__form">
        <Logo className="logo" />
        <AuthForm
          accepted={accepted}
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          inputErrors={inputErrorState}
          setAccepted={setAccepted}
          setUsername={setUsername}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={onSubmit}
          messages={messages}
          type={type}
        />
        <AuthButtons
          history={history}
          onSubmit={onSubmit}
          messages={messages}
          type={type}
        />
      </div>
      <SvgPoweredBy className="auth-page-container__powered-by"/>
      <FlashAlert
        show={errorState.show}
        message={errorState.message}
        duration={flashDuration}
        type="fail"
      />
      <style jsx>
        {`
          :global(.auth-page-container__powered-by) {
            align-self: ${svgAlignment};
          }
        `}
      </style>
    </div>
  );
}

AuthView.propTypes = {
  authToken: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  setAuthToken: PropTypes.func.isRequired,
  setSettings: PropTypes.func.isRequired,
};

const actionsMapper = getRdxActionMapper([
  'setAuthToken',
  'setSettings',
]);

const stateMapper = getRdxSelectionMapper({
  authToken: 'getAuthToken',
});

const AuthContainer = connect(stateMapper, actionsMapper)(AuthView);

export const AuthPage = injectIntl(AuthContainer);