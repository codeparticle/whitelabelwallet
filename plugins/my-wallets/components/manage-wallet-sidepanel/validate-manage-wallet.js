/**
 * @fileoverview Validator for editing a wallet
 * @author Gabriel Womble
 */
import { rules, validateObject } from '@codeparticle/formal';
import { REGEXES } from 'lib/constants';
import { mapInputErrors } from 'lib/utils';

const { REGEX_INPUT } = REGEXES;
const { isNonEmptyString, matchesRegex } = rules;


export function validateManageWallet({
  name,
}) {
  const validateForm = validateObject({
    name: [isNonEmptyString, matchesRegex(REGEX_INPUT)],
  });

  const formFields = {
    name,
  };

  return mapInputErrors(validateForm, formFields);
};
