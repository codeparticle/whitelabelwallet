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