import actions from 'rdx/actions';
import { service, store } from 'app';

export const implementPlugin = (plugin) => {
  if (typeof plugin !== 'function') {
    throw 'Plugin export is not a function';
  } else {
    store.dispatch(actions.registerPlugin(plugin(store, service)));
  }
};
