import React from 'react';
import {
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import PropTypes from 'prop-types';

const  { SvgReceive, SvgSend } = svgs.icons;

function CustomTypeRenderer ({ data }) {
  const Icon = data.transaction_type === 'receive'
    ?  SvgReceive
    : SvgSend;
  return (
    <Icon className="transaction-type" />
  );
}

CustomTypeRenderer.propTypes = {
  data: PropTypes.object.isRequired,
};

export { CustomTypeRenderer };