/**
 * @fileoverview A common return pattern for input validation in WLW
 * @author Gabriel Womble
 */

/**
 * Common return pattern for simple WLW input validation
 * @returns {*} - If errors, returns a simplified error schema, if none returns false
 * @param {func} validationFn - a function returned by formal's validateObject
 * @param {Object} formFields - the formFields to validate
 */
function mapInputErrors(validationFn, formFields) {
  const { errors = {}, hasErrors = false } = validationFn(formFields);

  if (hasErrors) {
    const inputErrors = {};
    Object.keys(formFields).forEach((field) => {
      if (errors[field]) {
        inputErrors[field] = true;
      }
    });
    return inputErrors;
  }

  return false;
}

export { mapInputErrors };
