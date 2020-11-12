/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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
