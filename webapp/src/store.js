import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { createHashHistory } from 'history';

import apiMiddleware from 'middleware';
import createRootReducer from './reducers';

export const history = createHashHistory();

const blacklistLoginFilter = createBlacklistFilter('auth', [
  'loginInProgress',
  'error'
]);

const blacklistCommonFilter = createBlacklistFilter('common', [
  'notifications',
  'sidebar'
]);
const blacklistSettingsFilter = createBlacklistFilter('settings', ['modal']);

const createCustomStore = preloadedState => {
  const persistConfig = {
    key: 'phone-webapp',
    storage,
    blacklist: ['sidebar', 'connection', 'call', 'dialpad', 'search'],
    transforms: [
      blacklistLoginFilter,
      blacklistCommonFilter,
      blacklistSettingsFilter
    ]
  };

  const persistedReducers = persistReducer(
    persistConfig,
    createRootReducer(history)
  );

  return createStore(
    persistedReducers,
    preloadedState,
    compose(
      applyMiddleware(apiMiddleware, routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};

export default () => {
  const store = createCustomStore(history);
  const persistor = persistStore(store);
  return { store, persistor };
};
