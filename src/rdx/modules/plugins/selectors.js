import { get } from 'lodash';

export default {
  getPlugins: state => get(state, 'plugins', {}),
  getRoleButtons: state => get(state, 'plugins.buttons', []),
};
