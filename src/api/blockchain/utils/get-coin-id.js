/**
 * @fileoverview Function to determine coin ID from env or given param
 * @author Gabriel Womble
 */
import { environment } from 'lib/utils';
import { COIN_IDS, COIN_KEYS } from '../constants';

const { isMock } = environment;
const { BTC, MOCK } = COIN_KEYS;

/**
 * @returns {number} coinId
 * @param {string} coinKey - value representing a coin key
 * supported values can be found in api/blockchain/constants
 */
export function getCoinId(coinKey = BTC) {
  if (isMock()) {
    return COIN_IDS[MOCK];
  }

  return COIN_IDS[coinKey];
}
