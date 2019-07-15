import { push } from 'connected-react-router';
// import types from 'rdx/modules/router/types';
// import createAction from 'rdx/utils/createAction';
import { stringify } from 'lib/modules/query-string';

export default {
  navigate: (_url, params = {}) => {
    let url = _url;
    const query = stringify(params);

    if (query) {
      url += `?${query}`;
    }

    return push(url);
  },
};
