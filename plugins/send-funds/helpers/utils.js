/**
 * @fileoverview Utility functions for the send funds plugin
 * @author Gabriel Womble
 */

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

export { resetStateHandler, valuesExist };
