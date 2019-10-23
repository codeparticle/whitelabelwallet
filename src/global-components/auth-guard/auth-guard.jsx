import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { environment } from 'lib/utils/environment';
import customPropTypes from 'lib/custom-prop-types';
import { AUTH_CONSTANTS } from 'lib/constants';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const { LOGIN, SIGNUP } = AUTH_CONSTANTS;
const { secret } = environment;

const AuthGuard = ({
  authToken,
  children,
  location,
  setAuthToken,
}) => {
  let shouldRedirect = false;

  jwt.verify(authToken, secret, (err) => {
    if (err || !authToken) {
      if (authToken !== '') {
        setAuthToken('');
      }
      shouldRedirect = true;
    }
  });

  if (shouldRedirect) {
    const { pathname } = location;

    if (pathname !== `/${LOGIN}` && !pathname.includes(`/${SIGNUP}`)) {
      return <Redirect to={`/${LOGIN}`} />;
    }
  }

  return children;
};

AuthGuard.propTypes = {
  authToken: PropTypes.string,
  children: customPropTypes.children,
  location: PropTypes.object.isRequired,
  setAuthToken: PropTypes.func.isRequired,
};

AuthGuard.defaultProps = {
  authToken: '',
  children: null,
};

const actionsMapper = getRdxActionMapper([
  'setAuthToken',
]);

const stateMapper = getRdxSelectionMapper({
  authToken: 'getAuthToken',
});

const AuthGuardContainer = withRouter(AuthGuard);

export default connect(stateMapper, actionsMapper)(AuthGuardContainer);
