/**
 * @fileoverview Intl Messages for the AuthPage
 * @author Gabriel Womble
 */
import { defineMessages } from 'react-intl';

export const AUTH = defineMessages({
  USERNAME: {
    id: 'auth.username',
    description: 'Login username text',
    defaultMessage: 'Username',
  },
  PASSWORD: {
    id: 'auth.password',
    description: 'Auth page password text',
    defaultMessage: 'Password',
  },
  CONFIRMED_PASSWORD: {
    id: 'auth.confirmed-pass',
    description: 'Confirmed Password text',
    defaultMessage: 'Confirmed Password',
  },
  TOS: {
    id: 'auth.tos',
    description: 'Terms of Service text',
    defaultMessage: 'Terms of Service',
  },
  DESIRED_USERNAME: {
    id: 'auth.desired-username',
    description: 'Signup page desired username text',
    defaultMessage: 'Desired Username',
  },
  CONFIRM_PASSWORD: {
    id: 'auth.confirm-pass',
    description: 'Signup page confirm password text',
    defaultMessage: 'Repeat Password',
  },
  TOS_ACCEPTED: {
    id: 'auth.tos-accepted',
    description: 'Signup page TOS disclaimer',
    defaultMessage: 'I agree to the Terms of Service',
  },
  LOGIN: {
    id: 'auth.login',
    description: 'Login text',
    defaultMessage: 'Log In',
  },
  SIGNUP: {
    id: 'auth.signup',
    description: 'Signup text',
    defaultMessage: 'Sign Up',
  },
  INVALID_LOGIN: {
    id: 'auth.invalid-login',
    description: 'Error message for Login page',
    defaultMessage: 'Invalid username or password.',
  },
  MISSING_FIELDS: {
    id: 'auth.missing-fields',
    description: 'Error message for empty expected fields',
    defaultMessage: 'Missing {fieldCount, plural, one {# field} other {# fields}}: {fields}',
  },
  USERNAME_EXISTS: {
    id: 'auth.username-exists',
    description: 'Error message for non-unique username',
    defaultMessage: 'Username is already taken.',
  },
  PASSWORD_MISMATCH: {
    id: 'auth.password-mismatch',
    description: 'Error message for password and confirm mismatch',
    defaultMessage: 'Password and repeated password do not match',
  },
  UNKNOWN_ERROR: {
    id: 'auth.unknown-error',
    description: 'Fallback error message',
    defaultMessage: 'An unknown error occurred. Please try again.',
  },
});