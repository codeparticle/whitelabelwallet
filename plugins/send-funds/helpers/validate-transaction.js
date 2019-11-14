/**
 * @fileoverview Validates a transaction before creating it
 * @author Gabriel Womble
 */
import { rules, validateObject } from '@codeparticle/formal';
import { ERRORS, REGEXES } from 'lib/constants';
import { mapInputErrors } from 'lib/utils';
import { MESSAGE_KEYS } from './constants';
import { getBalanceByAddress } from './queries';

const { BLOCKCHAIN: { INSUFFICIENT_FUNDS } } = ERRORS;
const { matchesRegex } = rules;
const { REGEX_ADDRESS } = REGEXES;
const { TO_ADDRESS } = MESSAGE_KEYS;

export async function validateTransaction({ fromAddress, toAddress, amount }) {
  const balance = await getBalanceByAddress(fromAddress);

  if (balance < amount) {
    return { [INSUFFICIENT_FUNDS]: true };
  }

  const validateForm = validateObject({
    [TO_ADDRESS]: [matchesRegex(REGEX_ADDRESS)],
  });

  const formFields = {
    [TO_ADDRESS]: toAddress,
  };

  return mapInputErrors(validateForm, formFields);
}