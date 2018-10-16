import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {PersistGate} from 'redux-persist/es/integration/react'
import {I18nextProvider} from 'react-i18next'
import ReactPiwik from 'react-piwik'



/**
 * Local imports
 */
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import configureStore from 'store'
import i18n from 'i18n'
import App from 'App'
// We need the PhoneProvider to be available in the whole app in order to make and receive calls

import PhoneProvider from 'calls/providers/PhoneProvider/PhoneProvider'

/**
 * Set up Sentry and Piwik analytics
 */

const piwik = new ReactPiwik({
  url: process.env.REACT_APP_PIWIK_URL,
  siteId: process.env.REACT_APP_PIWIK_SITE_ID,
  trackErrors: true,
});

/**
 * Set up the store and the history
 */
const history = createHistory()
const {store, persistor} = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <PersistGate loading={<div/>} persistor={persistor}>
        {/* Need to be here, before ConnectedRouter */}
        <PhoneProvider>
          <ConnectedRouter history={piwik.connectToHistory(history)}>
            <App/>
          </ConnectedRouter>
        </PhoneProvider>
      </PersistGate>
    </I18nextProvider>
  </Provider>, document.getElementById('root'))
registerServiceWorker()
