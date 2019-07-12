import { UPDATE_FORCE_RED } from './types';

export const updateForceRed = (forceRed) => {
  return {
    type: UPDATE_FORCE_RED,
    payload: forceRed,
  };
};
