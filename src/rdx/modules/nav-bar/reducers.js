import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/nav-bar/types';

const initialState = {
  isMobileOpen: false,
  isTabletOpen: true,
};

export default {
  navBarState: createReducer(initialState, {
    [types.TOGGLE_MOBILE_NAV_BAR](state, action) {
      return {
        ...state,
        isMobileOpen: action.payload,
      };
    },
    [types.TOGGLE_TABLET_NAV_BAR](state, action) {
      return {
        ...state,
        isTabletOpen: action.payload,
      };
    },
  }),
};
