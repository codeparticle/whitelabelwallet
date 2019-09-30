/**
 * @fileoverview Utility functions for the send funds plugin
 * @author Gabriel Womble
 */

/**
 * @returns {func} - function that is called by event handler
 * @param {func} fn - rdx action to dispatch
 * @param {any} initialState - value to reset state to
 */
function resetStateHandler(fn, initialState = {}) {
  return () => fn(initialState);
}

export { resetStateHandler };
