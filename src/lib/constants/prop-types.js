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
