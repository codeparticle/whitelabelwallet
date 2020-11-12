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
