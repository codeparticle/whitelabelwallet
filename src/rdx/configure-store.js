import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import compileReducers from 'rdx/reducers';
import rootSaga from 'rdx/sagas';
import thunk from 'redux-thunk';

const initialState = {};

// middlewares
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'authToken',
  ],
};

const configureStore = (history) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    thunk,
  ];

  if (process.env.REACT_APP_ENABLE_LOGGER_MIDDLEWARE) {
    middlewares.push(loggerMiddleware);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  let persistedRootReducer = persistReducer(persistConfig, compileReducers(history));

  const store = createStore(
    connectRouter(history)(persistedRootReducer),
    initialState,
    composeWithDevTools(...enhancers),
  );

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  if (process.env.REACT_APP_PURGE_RDX_PERSIST_STORE) {
    persistor.purge();
  }

  store.pluginsReducers = {};
  store.injectPluginReducer = (key, reducer) => {
    store.pluginsReducers[key] = reducer;

    persistedRootReducer = persistReducer(persistConfig, compileReducers(history, store.pluginsReducers));
    store.replaceReducer(connectRouter(history)(persistedRootReducer));

    return store;
  };

  return { store, persistor };
};

export default configureStore;
