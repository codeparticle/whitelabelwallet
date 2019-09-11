/**
 * @fileoverview Validator for editing / adding contact
 * @author Gabriel Womble
 */
import { rules, validateObject } from '@codeparticle/formal';
import { VALIDATIONS } from './constants';
import { mapInputErrors } from 'lib/utils';

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

  return mapInputErrors(validateForm, formFields);
};