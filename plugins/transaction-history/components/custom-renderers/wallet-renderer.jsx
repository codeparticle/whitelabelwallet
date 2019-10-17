import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  cellFormatters,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getWalletByAddress } from 'plugins/transaction-history/helpers';

const { Text } = cellFormatters;

const CustomWalletRenderer = ({ data }) => {
  const [walletName, setWalletName] = useState('');
  const address = data.transaction_type === 'receive'
    ? data.receiver_address
    : data.sender_address;

  useEffect(() => {
    const getWalletName = async () => {
      const queryResponse = await getWalletByAddress(address);
      const { name = '' } = queryResponse[0] || {};
      setWalletName(name);
    };

    getWalletName();
  }, [data]);



  return (
    <Text value={walletName}/>
  );
};

CustomWalletRenderer.propTypes = {
  data: PropTypes.object.isRequired,
};

export { CustomWalletRenderer };