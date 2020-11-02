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
 * @fileoverview Function to abstract translation boilerplate away from view file
 * @author Gabriel Womble
 */
import { TRANSLATION_KEYS } from 'translations/keys';
import { AUTH_CONSTANTS } from 'lib/constants';

const { LOGIN } = AUTH_CONSTANTS;
const { AUTH, COMMON } = TRANSLATION_KEYS;

/**
 * @returns {Object} - translations
 * @param {func} formatMessage - intl.formatMessage
 * @param {String} type - 'login' or 'signup'
 */
export function getTranslations(formatMessage, type) {
  const commonMessages = {
    password: formatMessage(AUTH.PASSWORD),
    tosPrompt: AUTH.TOS_PROMPT,
    tosSubTitle: formatMessage(AUTH.TOS_SUBTITLE),
    tos: formatMessage(AUTH.TOS),
  };

  if (type === LOGIN) {
    return {
      username: formatMessage(AUTH.USERNAME),
      btnSecondary: formatMessage(AUTH.SIGNUP),
      btnPrimary: formatMessage(AUTH.LOGIN),
      ...commonMessages,
    };
  }

  return {
    username: formatMessage(AUTH.DESIRED_USERNAME),
    confirmPassword: formatMessage(AUTH.CONFIRM_PASSWORD),
    btnSecondary: formatMessage(COMMON.CANCEL),
    btnPrimary: formatMessage(AUTH.SIGNUP),
    ...commonMessages,
  };
}
