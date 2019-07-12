import { get } from 'lodash';

export default {
  getAuthToken: state => get(state, 'authToken', ''),
};
