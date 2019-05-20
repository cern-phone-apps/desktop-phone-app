// Fetch the token from storage then navigate to our appropriate place
import { logMessage } from '../../common/utils/logging';

// eslint-disable-next-line import/prefer-default-export
export const redirectToCalling = async navigation => {
  // const userToken = await AsyncStorage.getItem("userToken");

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  logMessage('Redirecting to calling');
  navigation.navigate('Calling');
};
