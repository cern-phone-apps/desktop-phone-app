/* eslint-disable no-param-reassign */
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';

const showAlert = (title, body) => {
  Alert.alert(
    title,
    body,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};

const createNotificationListeners = async listeners => {
  /*
   * Triggered when a particular notification has been received in foreground
   * */
  listeners.notificationListener = firebase
    .notifications()
    .onNotification(notification => {
      const { title, body } = notification;
      //   showAlert(title, body);
    });

  /*
   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
   * */
  listeners.notificationOpenedListener = firebase
    .notifications()
    .onNotificationOpened(notificationOpen => {
      const { title, body } = notificationOpen.notification;
      //   showAlert(title, body);
    });

  /*
   * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
   * */
  const notificationOpen = await firebase
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    const { title, body } = notificationOpen.notification;
    // showAlert(title, body);
  }
  /*
   * Triggered for data only payload in foreground
   * */
  this.messageListener = firebase.messaging().onMessage(message => {
    // process data message
    console.log(JSON.stringify(message));
  });
};

export default createNotificationListeners;
