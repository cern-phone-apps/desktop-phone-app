import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import apiMiddleware from 'middleware';
import rootReducer from './reducers';

const createCustomStore = history => {
  // We don't want to persist the connection status
  const blacklistFilter = createBlacklistFilter('calls', [
    'connection',
    'search',
    'call',
    'dialpad',
    'contacts'
  ]);

  const blacklistLoginFilter = createBlacklistFilter('auth', [
    'loginInProgress',
    'error'
    // "loggedIn",
    // "token"
  ]);

  const blacklistCommonFilter = createBlacklistFilter('common', [
    'notifications',
    'sidebar'
  ]);

  const blacklistSettingsFilter = createBlacklistFilter('settings', ['modal']);

  const persistConfig = {
    key: 'phone-webapp',
    storage,
    blacklist: ['sidebar'],
    transforms: [
      blacklistFilter,
      blacklistLoginFilter,
      blacklistCommonFilter,
      blacklistSettingsFilter
    ]
  };

  const persistedReducers = persistReducer(persistConfig, rootReducer);

  return createStore(
    persistedReducers,
    {},
    compose(
      applyMiddleware(apiMiddleware, routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};

export default history => {
  const store = createCustomStore(history);
  const persistor = persistStore(store);
  return { store, persistor };
};
