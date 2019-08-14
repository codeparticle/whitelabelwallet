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
});