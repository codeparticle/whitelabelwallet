import { get } from 'lodash';
import { parse } from 'lib/modules/query-string';

export default {
  getLocation: state => get(state, 'router.location', null),
  getPath: state => get(state, 'router.location.path', ''),
  getCurrentQuery: (state) => {
    const search = get(state, 'router.location.search', '');
    if (!search) {
      return {};
    }
    return parse(search) || {};
  },
};
