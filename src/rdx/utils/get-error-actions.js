import actions from 'rdx/actions';

const clearAuthTokenAction = actions.setAuthToken('');

export default ({ error, target, message }) => {
  if (error.statusCode === 401) {
    const unauthorizedErr = { text: 'Your session has expired, please log in again' };
    return [
      clearAuthTokenAction,
      actions.newErrorEvent(unauthorizedErr),
    ];
  }
  const newErr = { ...error, target };
  if (message) {
    newErr.message = message;
  }
  return [actions.newErrorEvent(newErr)];
};
