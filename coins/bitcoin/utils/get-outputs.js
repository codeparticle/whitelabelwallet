import { floatToSatoshi } from 'lib/utils';

/**
 * Formats amounts from array of payment objects from float to satoshi
 * @returns {Object[]}
 * @param {Object[]} payments
 */
export function getOutputs(payments) {
  return payments.map(payment => ({
    address: payment.address,
    satoshis: parseInt((floatToSatoshi(payment.amount)).toFixed(0)),
  }));
}
