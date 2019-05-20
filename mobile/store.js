import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import rootReducer from './reducers';
import apiMiddleware from './middleware';


const createCustomStore = () => {
  // We don't want to persist the connection status
  const blacklistFilter = createBlacklistFilter('calls', [
    'connection',
    'search',
    'call',
    'dialpad'
  ]);

  const blacklistLoginFilter = createBlacklistFilter('auth', [
    'loginInProgress',
    'error',
    'authInProgress',
    'requestingToken'
    // "loggedIn",
    // "token"
  ]);

  const persistConfig = {
    key: 'phone-webapp',
    storage,
    transforms: [blacklistFilter, blacklistLoginFilter],
    stateReconciler: autoMergeLevel2
  };

  const persistedReducers = persistReducer(persistConfig, rootReducer);

  return createStore(
    persistedReducers,
    {},
    compose(
      applyMiddleware(apiMiddleware),
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};

export default () => {
  const store = createCustomStore();
  const persistor = persistStore(store);
  return { store, persistor };
};
