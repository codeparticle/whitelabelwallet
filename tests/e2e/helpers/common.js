/**
 * @fileoverview Common e2e helpers
 * @author Gabriel Womble
 */

/**
 * Formats a selector for a descendant element with support for nth-child
 * @returns {string} formattedSelector
 * @param {string} parentSelector - the parent selector
 * @param {string} descendantSelector - the child being targeted
 * @param {number} nthIndex - optional param passed to the nth-child selector
 */
function formatDescendantSelector(parentSelector, descendantSelector, nthIndex = null) {
  let formattedParent = parentSelector;

  if (typeof nthIndex === 'number') {
    formattedParent += `:nth-child(${nthIndex})`;
  }

  const formattedSelector = `${formattedParent} ${descendantSelector}`;

  return formattedSelector;
}

export { formatDescendantSelector };
