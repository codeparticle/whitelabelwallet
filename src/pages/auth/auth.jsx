import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Logo, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { useManager } from 'lib/hooks';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

import { AuthForm, AuthButtons } from './components';
import { getTranslations, getType, validateAuth } from './utils';
import './auth.scss';

const { SvgPoweredBy } = svgs.icons;

function AuthView({
  authToken,
  history,
  intl,
  match,
  setAuthToken,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [validated, setValidated] = useState(null);
  const manager = useManager();
  const type = getType(match.path);
  const messages = getTranslations(intl.formatMessage, type);

  useEffect(() => {
    if (authToken) {
      history.push('/');
    }
  }, [authToken]);

  useEffect(() => {
    if (validated) {
      const { token, hasError } = validated;

      if (hasError) {
        // TODO: set FlashMessage to error
        console.log('handling error');
      } else {
        setAuthToken(token);
      }

      setValidated(null);
    }
  }, [validated]);

  async function onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const isValid = await validateAuth({
      username,
      password,
      confirmPassword,
      accepted,
      type,
      manager,
    });

    setValidated(isValid);
  };

  return (
    <div className="auth-page-container" data-selector="auth-page">
      <div className="auth-page-container__form">
        <Logo className="logo" />
        <AuthForm
          accepted={accepted}
          username={username}
          password={password}
          confirmPassword={confirmPassword}
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
    </div>
  );
}

AuthView.propTypes = {
  authToken: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  setAuthToken: PropTypes.func.isRequired,
};

const actionsMapper = getRdxActionMapper([
  'setAuthToken',
]);

const stateMapper = getRdxSelectionMapper({
  authToken: 'getAuthToken',
});

const AuthContainer = connect(stateMapper, actionsMapper)(AuthView);

export const AuthPage = injectIntl(AuthContainer);