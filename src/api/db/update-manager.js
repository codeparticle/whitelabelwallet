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
 * @fileoverview Service to check if db requires an update. If so, performs the update and
 * increments the apps db_version
 * @author Gabriel Womble
 */
import { DatabaseManager } from './database-manager';
import { updates } from './updates';

/**
 * Checks for updates. Iterates through any required updates
 * in chronological order.
 * @returns - true if up to date, false if error
 * @param {any} instance - the sql-service instance
 */
export async function UpdateManager() {
  const updateNames = Object.keys(updates).sort((a, b) => a - b);
  const DBInstance = DatabaseManager.instance;

  if (updateNames === []) {
    return false;
  }

  let lastUpdate = await DBInstance.getCurrentVersion();

  const sliceIndex = updateNames.indexOf(`${lastUpdate}`) + 1;
  const updateVersions = updateNames.slice(sliceIndex);

  let retryCount = 0;

  for (let versionIndex = 0, version; versionIndex < updateVersions.length && retryCount < 2;) {
    version = updateVersions[versionIndex];

    if (version) {
      const update = updates[version];
      let success = null;

      try {
        success = await DBInstance.db.exec(update.try);
      } catch (error) {
        success = await DBInstance.db.exec(update.catch);
      }

      if (success) {
        await DBInstance.updateDbVersion({ 'db_version': parseFloat(version) }, lastUpdate);
        lastUpdate = version;
        retryCount = 0;
        versionIndex += 1;
      } else {
        console.log('An error occurred... Retrying.');
        retryCount += 1;
      }
    }
  }

  if (retryCount > 1) {
    console.log('Failed to update due to unknown error.');
    return false;
  }

  return true;
};
