/**
 * @fileoverview Intl Messages for the AuthPage
 * @author Gabriel Womble
 */
import { defineMessages } from 'react-intl';

export const AUTH = defineMessages({
  CONFIRM_PASSWORD: {
    id: 'auth.confirm-pass',
    description: 'Signup page confirm password text',
    defaultMessage: 'Repeat Password',
  },
  CONFIRMED_PASSWORD: {
    id: 'auth.confirmed-pass',
    description: 'Confirmed Password text',
    defaultMessage: 'Confirmed Password',
  },
  DESIRED_USERNAME: {
    id: 'auth.desired-username',
    description: 'Signup page desired username text',
    defaultMessage: 'Desired Username',
  },
  INVALID_LOGIN: {
    id: 'auth.invalid-login',
    description: 'Error message for Login page',
    defaultMessage: 'Invalid username or password.',
  },
  LOGIN: {
    id: 'auth.login',
    description: 'Login text',
    defaultMessage: 'Log In',
  },
  MISSING_FIELDS: {
    id: 'auth.missing-fields',
    description: 'Error message for empty expected fields',
    defaultMessage: 'Missing {fieldCount, plural, one {# field} other {# fields}}: {fields}',
  },
  PASSWORD_MISMATCH: {
    id: 'auth.password-mismatch',
    description: 'Error message for password and confirm mismatch',
    defaultMessage: 'Password and repeated password do not match',
  },
  PASSWORD: {
    id: 'auth.password',
    description: 'Auth page password text',
    defaultMessage: 'Password',
  },
  SIGNUP: {
    id: 'auth.signup',
    description: 'Signup text',
    defaultMessage: 'Sign Up',
  },
  TOS_PROMPT: {
    id: 'auth.tos-prompt',
    description: 'Signup page TOS disclaimer',
    defaultMessage: 'I agree to the {tosLink}',
  },
  TOS_SUBTITLE: {
    id: 'auth.tos-subitle',
    description: 'Auth page TOS subtitle',
    defaultMessage: 'Long, but important.',
  },
  TOS: {
    id: 'auth.tos',
    description: 'Terms of Service text',
    defaultMessage: 'Terms of Service',
  },
  UNKNOWN_ERROR: {
    id: 'auth.unknown-error',
    description: 'Fallback error message',
    defaultMessage: 'An unknown error occurred. Please try again.',
  },
  USERNAME_EXISTS: {
    id: 'auth.username-exists',
    description: 'Error message for non-unique username',
    defaultMessage: 'Username is already taken.',
  },
  USERNAME: {
    id: 'auth.username',
    description: 'Login username text',
    defaultMessage: 'Username',
  },
});