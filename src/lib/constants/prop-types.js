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
 * @fileoverview A common propTypes to reduce boilerplate
 * @author Gabriel Womble
 */
import PropTypes from 'prop-types';

/**
 * Takes an otherPropName and defaultValue and returns a PropTypes function
 * that will throw an error if props[otherPropName] equal defaultValue and the current
 * prop is null or undefined.
 * @returns {Function} propTypes validator
 * @param {string} otherPropName
 * @param {any} defaultValue
 */
function requiredIfNotOther(otherPropName, defaultValue = null) {
  return function (props, propName) {
    const thisProp = props[propName];
    const otherProp = props[otherPropName];

    if (otherProp === defaultValue && (thisProp === undefined || thisProp === null)) {
      return new Error(`The prop \`${propName}\` is required when the prop \`${otherPropName}\` is \`${defaultValue}\``);
    }
  };
}

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

const iconPropsShape = PropTypes.shape({
  height: numberOrString,
  width: numberOrString,
}).isRequired;

const renderable = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.node,
  PropTypes.func,
  PropTypes.element,
]);

export const PROP_TYPES = {
  numberOrString,
  iconPropsShape,
  renderable,
  requiredIfNotOther,
};
