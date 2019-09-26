/**
 * @fileoverview Function to get a blockchain manager key from coin id
 * @author Gabriel Womble
 */

import _ from 'lodash';
import { COIN_IDS } from '../constants';

/**
 * @returns {number} coinId
 * @param {string} coinId - value representing a coin's ID
 * supported values can be found in api/blockchain/constants
 */
export function getManagerKey(coinId) {
  const managerKeys = _.invert(COIN_IDS);
  return managerKeys[coinId];
}
