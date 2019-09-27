/**
 * @fileoverview Cell renderer with child icon
 * @author Gabriel
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPES } from 'lib/constants';
import { cellFormatters } from '@codeparticle/whitelabelwallet.styleguide';

const { numberOrString } = PROP_TYPES;
const { ChildIcon, Text } = cellFormatters;

function ChildItemRenderer({ cellStyles, column }) {
  const { childIcon } = cellStyles;

  return (
    <Fragment >
      <ChildIcon style={childIcon} />
      <Text value={column} />
    </Fragment>
  );
}

ChildItemRenderer.propTypes = {
  cellStyles: PropTypes.object.isRequired,
  column: numberOrString.isRequired,
};

export { ChildItemRenderer };
