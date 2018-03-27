import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import {PersistGate} from 'redux-persist/es/integration/react'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from 'store'

const history = createHistory()
const {store, persistor} = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={<div/>} persistor={persistor}>
        <Switch>
          <Route path='/' component={App}/>
        </Switch>
      </PersistGate>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'))
registerServiceWorker()
