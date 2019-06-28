import firebase from 'react-native-firebase';

const getToken = async () => {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
};

const requestPermission = async () =>
  firebase
    .messaging()
    .requestPermission()
    .then(() => {
      getToken();
    })
    .catch(error => {
      console.warn(`${error} permission rejected`);
    });

const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

export default checkPermission;
