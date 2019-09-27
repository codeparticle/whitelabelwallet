/**
 * @fileoverview A cell formatter used in the send funds address list
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPES } from 'lib/constants';
import { cellFormatters } from '@codeparticle/whitelabelwallet.styleguide';

const { numberOrString } = PROP_TYPES;
const { Text, ChildCount } = cellFormatters;

function ChildCountRenderer({ cellStyles, column, data }) {
  const count = data.addresses.length;

  if (count <= 1) {
    return (
      <Text value={column} />
    );
  }

  return (
    <div className="child-count">
      <p>{column}</p>
      <ChildCount
        childCount={count}
        style={cellStyles.childCount}
      />
      <style jsx>
        {`
          .child-count {
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
          }

          .child-count > p {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>
    </div>
  );
}

ChildCountRenderer.propTypes = {
  column: numberOrString.isRequired,
  data: PropTypes.object,
  cellStyles: PropTypes.object.isRequired,
};


export { ChildCountRenderer };
