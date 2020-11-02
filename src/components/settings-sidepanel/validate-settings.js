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
 * @fileoverview Validator for editing user settings
 * @author Gabriel Womble
 */
import { rules, validateObject } from '@codeparticle/formal';
import { REGEXES } from 'lib/constants';
import { mapInputErrors } from 'lib/utils';

const { REGEX_INPUT } = REGEXES;
const { isNonEmptyString, matchesRegex } = rules;


/**
  @typedef SettingsFields
  @type {Object}
  @property {string} confirmedPassword - confirmedPassword value
  @property {string} currentPassword - currentPassword value
  @property {string} managerPassword - currentPassword to verify against currentPassword
  @property {string} newPassword - newPassword value
  @property {string} username - username value
*/

/**
  @typedef PasswordValidations
  @type {Object}
  @property {Object} passwordFields - passed to form fields
  @property {Object} passwordValidations - passed to validation object
 */

/**
 * Determines if passwords need to be validated. If so, returns password fields and corresponding validators
 * @returns {PasswordValidations} PasswordValidations
 * @param {string} currentPassword
 * @param {string} newPassword
 * @param {string} confirmedPassword
 * @param {string} managerPassword
 */
function getPasswordValidations(currentPassword, newPassword, confirmedPassword, managerPassword) {
  if (currentPassword || newPassword || confirmedPassword) {
    const managerPasswordRegex = new RegExp(managerPassword);
    const newPasswordRegex = new RegExp(confirmedPassword);
    const confirmPasswordRegex = new RegExp(newPassword);

    return {
      passwordFields: {
        currentPassword,
        newPassword,
        confirmedPassword,
      },
      passwordValidations: {
        currentPassword: [isNonEmptyString, matchesRegex(managerPasswordRegex)],
        newPassword: [isNonEmptyString, matchesRegex(REGEX_INPUT), matchesRegex(newPasswordRegex)],
        confirmedPassword: [isNonEmptyString, matchesRegex(REGEX_INPUT), matchesRegex(confirmPasswordRegex)],
      },
    };
  }

  return {
    passwordFields: {},
    passwordValidations: {},
  };
}

/**
 * Validates the Settings Form Fields before submission
 * @param {SettingsFields} SettingsFields (username, currentPassword, newPassword, confirmedPassword)
 */
export function validateSettings({
  confirmedPassword,
  currentPassword,
  managerPassword,
  newPassword,
  username,
}) {
  const { passwordFields, passwordValidations } = getPasswordValidations(
    currentPassword,
    newPassword,
    confirmedPassword,
    managerPassword
  );
  const validationObject = {
    username: [isNonEmptyString, matchesRegex(REGEX_INPUT)],
    ...passwordValidations,
  };

  const formFields = {
    username,
    ...passwordFields,
  };

  const validateForm = validateObject(validationObject);

  return mapInputErrors(validateForm, formFields);
}
