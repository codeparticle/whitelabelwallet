import { get } from 'lodash';
import { initialState } from './reducers';

export default {
  getLocale: state => get(state, 'settings.locale', initialState.locale),
  getSettings: state => get(state, 'settings', initialState),
  getTheme: state => get(state, 'settings.theme', initialState.theme),
};
