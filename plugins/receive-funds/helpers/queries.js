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
/**
 * @fileoverview Queries related to the receive funds plugin
 * @author Gabriel Womble
 */
import { manager } from 'app';

/**
 * Function that returns an array of wallet objects with an addresses property
 * @returns {Array} wallet objects with addresses stored as a property
 */
async function getWalletAddresses() {
  return await manager.databaseManager.getWalletAddresses();
}

/**
 * Returns an array of wallet objects based on the queried value
 * @returns {Array}
 * @param {string} value
 */
async function getWalletAddressesByValue(value) {
  return await manager.databaseManager.getWalletAddressesByValue(value);
}

/**
 * Function that retrieves formatted address name from DB
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} address - the address to query
 */
async function getAddressName(setFn, address) {
  if (address) {
    const res = await manager.databaseManager.getAddressName(address);
    setFn(res);
  } else {
    setFn('');
  }
}

export {
  getAddressName,
  getWalletAddresses,
  getWalletAddressesByValue,
};
