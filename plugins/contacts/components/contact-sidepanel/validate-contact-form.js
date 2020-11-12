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