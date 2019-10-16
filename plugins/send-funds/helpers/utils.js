/**
 * @fileoverview Utility functions for the send funds plugin
 * @author Gabriel Womble
 */
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import { MESSAGE_KEYS } from './constants';

const {
  AMOUNT,
  TO_ADDRESS,
  SUCCESS,
} = MESSAGE_KEYS;

const {
  INSUFFICIENT_FUNDS,
  INVALID_ADDRESS,
  SEND_SUCCESSFUL,
} = SEND_FUNDS;

const messages = {
  [AMOUNT]: INSUFFICIENT_FUNDS,
  [TO_ADDRESS]: INVALID_ADDRESS,
  [SUCCESS]: SEND_SUCCESSFUL,
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

export {
  getAlertMessage,
  isJson,
  notEmptyOrNull,
  resetStateHandler,
  valuesExist,
};
