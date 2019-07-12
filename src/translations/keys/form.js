import { defineMessages } from 'react-intl';

export const FORM = defineMessages({
  ERROR_EMAIL_ADDRESS: {
    id: 'form.error-email-address',
    description: 'Error text displayed when an invalid email address is entered',
    defaultMessage: 'Must be a valid email address',
  },
  ERROR_PASSWORD_LENGTH: {
    id: 'form.error-password-length',
    description: 'Error text displayed when a password length is invalid',
    defaultMessage: 'Password must be {isMin, select, true {at least} false {less than}} {count} characters',
  },
  ERROR_MAX_CHARACTERS: {
    id: 'form.error-max-characters',
    description: 'Error text displayed when text input has surpassed the maximum amount of characters',
    defaultMessage: 'Maximum allowed characters is {max}.',
  },
  ERROR_VALUE_REQUIRED: {
    id: 'form.error-value-required',
    description: 'Error text displayed when an input value is required',
    defaultMessage: 'Value is required',
  },
  ERROR_ZIP_CODE: {
    id: 'form.error-zip-code',
    description: 'Error text displayed when an invalid zipcode is entered',
    defaultMessage: 'Please enter a 5 character zipcode',
  },
  PASSWORD_PLACEHOLDER: {
    id: 'form.password-placeholder',
    description: 'Placeholder for a password field',
    defaultMessage: 'Enter your password',
  },
  WRONG_PASSWORD: {
    id: 'form.wrong-password',
    description: 'Text displayed to the user when they enter the wrong password',
    defaultMessage: 'Wrong password!',
  },
});
