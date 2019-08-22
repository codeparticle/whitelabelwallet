import types from 'rdx/modules/nav-bar/types';
import createAction from 'rdx/utils/create-action';

export default {
  toggleMobileNavBar: actions => createAction(types.TOGGLE_MOBILE_NAV_BAR, actions),
  toggleTabletNavBar: actions => createAction(types.TOGGLE_TABLET_NAV_BAR, actions),
};
