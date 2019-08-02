/**
 * @fileoverview Service to check if db requires an update. If so, performs the update and
 * increments the apps db_version
 * @author Gabriel Womble
 */
import { updates } from './updates';

/**
 * Checks for updates. Iterates through any required updates
 * in chronological order.
 * @returns - true if up to date, false if error
 * @param {any} instance - the sql-service instance
 */
export async function UpdateService(instance) {
  const updateNames = Object.keys(updates).sort((a, b) => a - b);

  if (updateNames === []) {
    return false;
  }

  let lastUpdate = await instance.getCurrentVersion();

  const sliceIndex = updateNames.indexOf(`${lastUpdate}`) + 1;
  const updateVersions = updateNames.slice(sliceIndex);

  let retryCount = 0;

  for (let versionIndex = 0; versionIndex < updateVersions.length && retryCount < 2;) {
    const version = updateVersions[versionIndex];

    if (version) {
      const update = updates[version];
      const success = await update(instance);

      if (success) {
        await instance.updateDbVersion({ 'db_version': parseFloat(version) }, lastUpdate);
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
