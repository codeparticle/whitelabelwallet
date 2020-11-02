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
