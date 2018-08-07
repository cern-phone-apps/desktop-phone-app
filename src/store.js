import {applyMiddleware, createStore, compose} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import {routerMiddleware} from 'react-router-redux'
import storage from 'redux-persist/lib/storage'
import {createBlacklistFilter} from 'redux-persist-transform-filter'

import rootReducer from './reducers'
import apiMiddleware from 'middleware'

const createCustomStore = (history) => {
  // We don't want to persist the connection status
  const blacklistFilter = createBlacklistFilter(
    'calls',
    ['connection', 'search', 'call', 'dialpad']
  )

  const blacklistLoginFilter = createBlacklistFilter(
    'auth',
    ['loginInProgress']
  )

  const blacklistCommonFilter = createBlacklistFilter(
    'common',
    ['notifications']
  )

  const persistConfig = {
    key: 'phone-webapp',
    storage: storage,
    blacklist: ['sidebar'],
    transforms: [blacklistFilter, blacklistLoginFilter, blacklistCommonFilter]
  }

  const persistedReducers = persistReducer(
    persistConfig,
    rootReducer
  )

  const store = createStore(
    persistedReducers, {},
    compose(
      applyMiddleware(
        apiMiddleware,
        routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}

export default (history) => {
  let store = createCustomStore(history)
  let persistor = persistStore(store)
  return {store, persistor}
}
