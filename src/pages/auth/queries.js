/**
 * @fileoverview Queries related to the auth page
 * @author Gabriel Womble
 */

async function getUserSettingsAndUpdateState(manager, setFn) {
  const res = await manager.databaseManager.getUserSettings();
  setFn(res);
}

export { getUserSettingsAndUpdateState };
