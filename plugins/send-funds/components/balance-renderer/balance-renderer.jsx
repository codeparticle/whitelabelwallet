/**
 * @fileoverview Balance renderer for address list
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { cellFormatters } from '@codeparticle/whitelabelwallet.styleguide';

const { Text } = cellFormatters;

function BalanceRenderer({ data }) {
  const { addresses } = data;
  let balance = 0;

  addresses.forEach((address) => {
    balance += address.balance;
  });

  return (
    <Text value={balance.toFixed(2)} />
  );
};

BalanceRenderer.propTypes = {
  data: PropTypes.object.isRequired,
};

export { BalanceRenderer };
