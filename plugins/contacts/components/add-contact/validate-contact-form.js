/**
 * @fileoverview Validator for editing / adding contact
 * @author Gabriel Womble
 */
import { rules, validateObject } from '@codeparticle/formal';
import { VALIDATIONS } from './constants';

const {
  ADDRESS_MIN_LENGTH,
  ADDRESS_REGEX,
  TEXT_REGEX,
} = VALIDATIONS;
const { isNonEmptyString, matchesRegex, minLength } = rules;


export function validateContactForm({
  name,
  address,
}) {
  const validateForm = validateObject({
    name: [isNonEmptyString, matchesRegex(TEXT_REGEX)],
    address: [minLength(ADDRESS_MIN_LENGTH), matchesRegex(ADDRESS_REGEX)],
  });

  const formFields = {
    name,
    address,
  };

  const { errors = {}, hasErrors = false } = validateForm(formFields);

  if (hasErrors) {
    const inputErrors = {};
    Object.keys(formFields).forEach((field) => {
      if (errors[field]) {
        inputErrors[field] = true;
      }
    });
    return inputErrors;
  }

  return false;
};