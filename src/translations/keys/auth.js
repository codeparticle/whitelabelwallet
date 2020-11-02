/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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