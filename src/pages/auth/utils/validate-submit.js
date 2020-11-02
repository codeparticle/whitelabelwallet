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
import { createRule, validateObject } from '@codeparticle/formal';
import { AUTH_CONSTANTS } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';

const { AUTH } = TRANSLATION_KEYS;
const { SIGNUP, ERRORS } = AUTH_CONSTANTS;

const {
  MISSING_FIELDS,
  PASSWORD_MISMATCH,
} = AUTH;

const {
  MISMATCH,
  MISSING_FIELD,
} = ERRORS;

const signupCondition = (type, condition) => type !== SIGNUP || condition;

const isNotEmpty = createRule({
  condition: (str) => Boolean(str),
  message: MISSING_FIELD,
});

export function validateSubmit({
  username: USERNAME,
  password: PASSWORD,
  confirmPassword: CONFIRMED_PASSWORD,
  accepted: TOS,
  type,
  intl,
}) {
  const isNotRequiredOrEmpty = createRule({
    condition: (str) => signupCondition(type, Boolean(str)),
    message: MISSING_FIELD,
  });

  const matchesPassword = createRule({
    condition: (str) => signupCondition(type, PASSWORD === str),
    message: MISMATCH,
  });

  const validationRules = {
    USERNAME: [isNotEmpty],
    PASSWORD: [isNotEmpty],
    CONFIRMED_PASSWORD: [isNotRequiredOrEmpty, matchesPassword],
    TOS: [isNotRequiredOrEmpty],
  };

  const formFields = {
    USERNAME,
    PASSWORD,
    CONFIRMED_PASSWORD,
    TOS,
  };

  const validateForm = validateObject(validationRules);
  const { errors = {}, hasErrors = false } = validateForm(formFields);

  if (hasErrors) {
    let misMatch = false;
    const messages = [];
    const inputErrors = {
      USERNAME: false,
      PASSWORD: false,
      CONFIRMED_PASSWORD: false,
    };

    Object.keys(errors).forEach((field) => {
      const error = errors[field];

      if (error.includes(MISSING_FIELD)) {
        messages.push(intl.formatMessage(AUTH[field]));
        inputErrors[field] = true;
      } else if (error.includes(MISMATCH)) {
        misMatch = true;
      }
    });

    if (messages.length) {
      const fields = messages.join(', ');
      const fieldCount = messages.length;

      return {
        message: MISSING_FIELDS,
        messageData: {
          fields,
          fieldCount,
        },
        inputErrors,
      };
    }

    if (misMatch) {
      return {
        message: PASSWORD_MISMATCH,
        inputErrors: {
          PASSWORD: true,
          CONFIRMED_PASSWORD: true,
        },
      };
    }
  }

  return false;
}
