import { UPDATE_FORCE_RED } from './types';

export function blueButton(state = { forceRed: false }, action) {
  switch (action.type) {
    case UPDATE_FORCE_RED: {
      return {
        forceRed: action.payload,
      };
    }
    default:
      return state;
  }
};
