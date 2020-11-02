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
 * @fileoverview Utility functions for the send funds plugin
 * @author Gabriel Womble
 */
import { BLOCKCHAIN } from 'translations/keys/blockchain';
import { ERRORS } from 'lib/constants';

import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { MESSAGE_KEYS } from './constants';

const {
  BLOCKCHAIN: {
    API_ERROR,
    BROADCAST_ERROR,
    INSUFFICIENT_FUNDS,
  },
} = ERRORS;

const {
  TO_ADDRESS,
  SUCCESS,
} = MESSAGE_KEYS;

const {
  INVALID_ADDRESS,
  SEND_SUCCESSFUL,
} = SEND_FUNDS;

const messages = {
  [API_ERROR]: BLOCKCHAIN[API_ERROR],
  [BROADCAST_ERROR]: BLOCKCHAIN[BROADCAST_ERROR],
  [INSUFFICIENT_FUNDS]: BLOCKCHAIN[INSUFFICIENT_FUNDS],
  [SUCCESS]: SEND_SUCCESSFUL,
  [TO_ADDRESS]: INVALID_ADDRESS,
};

/**
 * @returns {func} - function that is called by event handler
 * @param {func} fn - rdx action to dispatch
 * @param {any} initialState - value to reset state to
 */
function resetStateHandler(fn, initialState = '') {
  return () => fn(initialState);
}

/**
 * @returns {boolean} - true if value is not falsy, empty, or null/undefined
 * @param {any} value - the value to be evaluated
 */
function notEmptyOrNull(value) {
  const primitiveIstruthy = Boolean(value) && typeof value !== 'object';
  const objectIsTruthy = (value !== null && value !== undefined) && Object.values(value).length !== 0;

  return primitiveIstruthy || objectIsTruthy;
}

/**
 * @returns {boolean} - true if all values return notEmptyOrNull
 * @param  {...any} values - values to verify
 */
function valuesExist(...values) {
  if (values.length === 0) {
    return false;
  }

  let i = 0;

  while (notEmptyOrNull(values[i]) && i < values.length) {
    i += 1;
  }

  return i === values.length;
}

/**
 * Helper to retrieve formatted alert message
 * @returns {Object} formatted message
 * @param {Function} formatMessage
 * @param {Object} alert
 * @param {string} formattedName
 */
function getAlertMessage(formatMessage, alert, formattedName = '') {
  if (!(alert)) {
    return '';
  }

  const { data = {}, message } = alert;
  const { amount = '', receiver_address: address = '' } = data;

  return formatMessage(messages[message], { address, amount, formattedName });
}

/**
 * @returns {Boolean} - true if is JSON w/ object structure, false otherwise
 * @param {any} data
 */
function isJson(data) {
  if (typeof data !== 'string') {
    return false;
  }

  try {
    if (typeof JSON.parse(data) === 'object') {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
}

function openInNewTab(link) {
  const a = document.createElement('a');
  a.href = link;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export {
  getAlertMessage,
  isJson,
  notEmptyOrNull,
  openInNewTab,
  resetStateHandler,
  valuesExist,
};
