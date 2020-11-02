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
import { DatabaseManager } from '../database-manager';
import * as address from './addresses.json';
import * as contact from './contacts.json';
import * as wallet from './wallets.json';
import * as transaction from './transactions.json';

/**
 * Function that loops through data object to insert
 * values into appropriate tables.
 */
export function insertMocks() {
  const dbInstance = DatabaseManager.instance;

  const data = {
    address,
    contact,
    transaction,
    wallet,
  };

  Object.keys(data).forEach((type) => {
    const vals = Object.values(data[type]);

    for (let k = 0; k < vals.length - 1; k++) {
      dbInstance.insert()[type](vals[k]);
    }
  });

  return true;
}
