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
