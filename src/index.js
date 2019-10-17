import './index.css';
import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/es/integration/react';
import { I18nextProvider } from 'react-i18next';
import ReactPiwik from 'react-piwik';
import config from 'config';

/**
 * Local imports
 */
import configureStore, { history } from 'store';
import i18n from 'i18n';
import App from 'App';
import PhoneProviderContainer from 'calls/providers/PhoneProvider/PhoneProviderContainer';
import LogsProvider from 'services/LogService/LogServiceContainer';
// We need the PhoneProvider to be available in the whole app in order to make and receive calls
import registerServiceWorker from './registerServiceWorker';

/**
 * Set up Sentry and Piwik analytics
 */

const piwik = new ReactPiwik({
  url: config.piwik.URL,
  siteId: config.piwik.SITE_ID,
  trackErrors: true
});

// const { store, persistor } = configureStore(history);
const { store, persistor } = configureStore({});

function Main() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PersistGate loading={<div />} persistor={persistor}>
          {/* Need to be here, before ConnectedRouter */}
          <LogsProvider>
            <PhoneProviderContainer>
              <ConnectedRouter history={piwik.connectToHistory(history)}>
                <App />
              </ConnectedRouter>
            </PhoneProviderContainer>
          </LogsProvider>
        </PersistGate>
      </I18nextProvider>
    </Provider>
  );
}
export default Main;

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
