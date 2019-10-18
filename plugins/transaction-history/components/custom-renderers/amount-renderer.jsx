import React, { Fragment } from 'react';
import {
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import PropTypes from 'prop-types';
import { red, green } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';

const { SvgCoinSymbol } = svgs.icons;

function CustomAmountRenderer({ data, column }) {
  const color = data.transaction_type === 'receive'
    ? green
    : red;

  return (
    <Fragment>
      <p className="transaction-amount"><SvgCoinSymbol/>{`${column}`}</p>
      <style jsx>
        {`
          p {
            color: ${color};
          }
        `}
      </style>
    </Fragment>
  );
}

CustomAmountRenderer.propTypes = {
  data: PropTypes.object.isRequired,
  column: PropTypes.number,
};

CustomAmountRenderer.defaultProps = {
  column: 0,
};

export { CustomAmountRenderer };