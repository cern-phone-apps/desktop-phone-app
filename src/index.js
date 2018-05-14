import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {PersistGate} from 'redux-persist/es/integration/react'
import {I18nextProvider} from 'react-i18next'
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
import PhoneProvider from 'providers/PhoneProvider/PhoneProvider'

const history = createHistory()
const {store, persistor} = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <PersistGate loading={<div/>} persistor={persistor}>
        {/* Need to be here, before ConnectedRouter */}
        <PhoneProvider>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </PhoneProvider>
      </PersistGate>
    </I18nextProvider>
  </Provider>, document.getElementById('root'))
registerServiceWorker()
