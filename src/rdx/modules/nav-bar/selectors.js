import { get } from 'lodash';

export default {
  getIsMobileNavBarOpen: state => get(state, ['navBarState', 'isMobileOpen'], false),
  getIsTabletNavBarOpen: state => get(state, ['navBarState', 'isTabletOpen'], false),
};
