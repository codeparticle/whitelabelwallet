/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import { environment } from 'lib/utils';
const { isDev } = environment;

const KEY = 'btc';
const TESTNET = 'testnet';
const BITCOIN = 'bitcoin';

const NETWORK = isDev()
  ? TESTNET
  : BITCOIN;

const NET = NETWORK === TESTNET
  ? 'test3'
  : 'main';

const API_PREFIX = NETWORK === TESTNET ? `${TESTNET}.` : '';

// TODO: Would like to refactor address polling to leverage blockexplorer so that
// We only need to rely on one api
const BLOCK_CYPHER = `https://api.blockcypher.com/v1/btc/${NET}`;
const BLOCK_EXP_BASE = `https://${API_PREFIX}blockexplorer.com`;
const BLOCK_EXP = `${BLOCK_EXP_BASE}/api`;

const urls = {
  ADDRESS: `${BLOCK_CYPHER}/addrs`,
  FULL_ADDRESS: (addr) => `${urls.ADDRESS}/${addr}/full`,
};

const EXPLORER_URLS = {
  BLOCK_HASH: blockHeight => `${BLOCK_EXP}/block-index/${blockHeight}`,
  SEND_TX: () => `${BLOCK_EXP}/tx/send`,
  STATUS: () => `${BLOCK_EXP}/status`,
  UNSPENT_OUTPUTS: addr => `${BLOCK_EXP}/addr/${addr}/utxo`,
  VIEW_TX: tx => `${BLOCK_EXP_BASE}/tx/${tx}`,
};

const BIP32 = {
  DERIVATION_PATH_BASE: "m/0'",
  CHANGE_CHAIN: {
    EXTERNAL: 0,
    INTERNAL: 1,
  },
  ACCOUNT_BASE: 0,
};

const DEFAULT_FEE = 7500;
const DUST_THRESHOLD = 0.00000066;

export {
  BIP32,
  DEFAULT_FEE,
  DUST_THRESHOLD,
  EXPLORER_URLS,
  KEY,
  NETWORK,
  urls,
};