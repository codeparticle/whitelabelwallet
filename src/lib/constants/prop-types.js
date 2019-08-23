/**
 * @fileoverview A common propTypes to reduce boilerplate
 * @author Gabriel Womble
 */
import PropTypes from 'prop-types';

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

const iconPropsShape = PropTypes.shape({
  height: numberOrString,
  width: numberOrString,
}).isRequired;

export const PROP_TYPES = {
  numberOrString,
  iconPropsShape,
};
