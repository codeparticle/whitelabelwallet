import { get } from 'lodash';

export default {
  getLang: state => get(state, 'locale.lang', {}),
  getMessages: state => get(state, 'locale.messages', {}),
};
