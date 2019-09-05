import { get } from 'lodash';
import { initialState } from './reducers';

export default {
  getSettings: state => get(state, 'settings', initialState),
  getTheme: state => get(state, 'settings.theme', initialState.theme),
};
