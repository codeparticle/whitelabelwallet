/**
 * @fileoverview Common List CellRenderer used for displaying amoounts
 * @author Marc Mathieu, Gabriel Womble
 */
import React, { Fragment } from 'react';
import { svgs } from '@codeparticle/whitelabelwallet.styleguide';
import PropTypes from 'prop-types';
import { red, green } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';
import { space1 } from '@codeparticle/whitelabelwallet.styleguide/styles/layout.scss';
import { GENERAL } from 'lib/constants';

const { TRANSACTION_TYPES: { RECEIVE } } = GENERAL;

const { SvgCoinSymbol } = svgs.icons;

function AmountRenderer({ data, column }) {
  const color = data.transaction_type === RECEIVE
    ? green
    : red;

  return (
    <Fragment>
      <p className="amount-renderer"><SvgCoinSymbol fill={color} />{`${column}`}</p>
      <style jsx>
        {`
          .amount-renderer {
            align-items: center;
            color: ${color};
            display: flex;
          }

          :global(.amount-renderer > svg) {
            margin-right: ${space1};
          }
        `}
      </style>
    </Fragment>
  );
}

AmountRenderer.propTypes = {
  column: PropTypes.number,
  data: PropTypes.object.isRequired,
};

AmountRenderer.defaultProps = {
  column: 0,
};

export { AmountRenderer };