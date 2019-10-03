import React from 'react';
import PropTypes from 'prop-types';
import {
  cellFormatters,
} from '@codeparticle/whitelabelwallet.styleguide';

const { Text } = cellFormatters;

function CustomAddressRenderer({ data, addresses }) {
  const address = data.transaction_type === 'receive'
    ? data.receiver_address
    : data.sender_address;
  const { name = '' } = addresses.find((walletAddress) => walletAddress.address === address) || {};

  return (
    <Text value={name}/>
  );
}

CustomAddressRenderer.propTypes = {
  addresses: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export { CustomAddressRenderer };