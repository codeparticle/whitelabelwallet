/**
 * @fileoverview Blockchain Related messages
 * @author Gabriel Womble
 */
import { defineMessages } from 'react-intl';
import { ERRORS } from 'lib/constants';

const {
  BLOCKCHAIN: {
    API_ERROR,
    BROADCAST_ERROR,
    INSUFFICIENT_FUNDS,
  },
} = ERRORS;

export const BLOCKCHAIN = defineMessages({
  [API_ERROR]: {
    id: 'blockchain.api-error',
    description: 'Generic blockchain api error message',
    defaultMessage: 'An error occurred while contacting the blockchain.',
  },
  [BROADCAST_ERROR]: {
    id: 'blockchain.broadcast-error',
    description: 'Generic tx broadcast error message',
    defaultMessage: 'An error occurred when broadcasting your transaction.',
  },
  [INSUFFICIENT_FUNDS]: {
    id: 'blockchain.insufficient-funds',
    description: 'Insufficient funds error message',
    defaultMessage: 'Insufficient funds error: Please try adjusting the fee or lowering the amount to send.',
  },
});
