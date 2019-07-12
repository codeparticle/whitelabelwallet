import React from 'react';
import PropTypes from 'prop-types';
import customPropTypes from 'lib/custom-prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const AuthGuard = ({
  authToken,
  children,
}) => {
  if (!authToken) {
    return <Redirect to="/login" />;
  }

  return children;
};

AuthGuard.propTypes = {
  authToken: PropTypes.string,
  children: customPropTypes.children,
};

AuthGuard.defaultProps = {
  authToken: '',
  children: null,
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
  authToken: 'getAuthToken',
});

export default connect(stateMapper, actionsMapper)(AuthGuard);
