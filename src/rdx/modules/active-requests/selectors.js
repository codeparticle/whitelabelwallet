import types from 'rdx/types';
import { createSelector } from 'reselect';

const getActiveRequests = state => state.activeRequests;

const getActiveRequestType = type => createSelector(
  getActiveRequests,
  activeRequests => activeRequests.filter(ar => ar.type === type).length > 0,
);

// for particular AR instance selection from state
export const activeRequestExists = ({
  activeRequests, id, type, data, keysToCheck,
}) => {
  const index = activeRequests.findIndex((ar) => {
    if (id) {
      // if unique id used for check, no need to go further
      return ar.id === id;
    }
    // next filter by type (if applicable)
    if (type) {
      if (type !== ar.type) {
        return false;
      }
    }
    if (data) {
      const arPayload = ar.payload;
      const keys = keysToCheck || Object.keys(data);
      // check each activeRequest's payload for matches to supplied data
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (arPayload[key] && arPayload[key] !== data[key]) {
          return false;
        }
      }
    }
    return true;
  });
  return index >= 0;
};

export default {
  getActiveRequests,
  // specific request types
  isGetUserRequestActive: getActiveRequestType(types.REQUEST_USER),
};
