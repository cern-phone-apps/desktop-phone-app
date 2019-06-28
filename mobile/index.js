/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry, View, Text } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { name as appName } from './app.json';
import App from './App';
import configureStore from './store';

import PhoneProvider from './src/calls/providers/PhoneProvider/PhoneProviderContainer';
import checkPermission from './PushNotifications';
import createNotificationListeners from './NotificationListener';
/**
 * Set up the store and the history
 */
const { store, persistor } = configureStore();

const LoadingComponent = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

class PhoneMobile extends Component {
  listeners = {
    notificationListener: undefined,
    notificationOpenedListener: undefined
  };

  async componentDidMount() {
    checkPermission();
    createNotificationListeners(this.listeners);
  }

  componentWillUnmount() {
    this.listeners.notificationListener();
    this.listeners.notificationOpenedListener();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>
          <PhoneProvider>
            <App />
          </PhoneProvider>
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => PhoneMobile);
