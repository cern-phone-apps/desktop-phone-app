import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Dimensions, StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';
import { logMessage } from '../../../common/utils/logging';

export class RegisterLoadingScreen extends React.Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    console.log(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { connected, navigation } = this.props;
    // const userToken = await AsyncStorage.getItem("userToken");
    logMessage('REGISTER LOADING: connected');
    logMessage(connected);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(connected ? 'AppRegistered' : 'Register');
  };

  componentDidUpdate(prevProps, prevState) {
    this._bootstrapAsync();
  }

  // Render any loading content that you like here
  render() {
    console.log('RegisterLoadingScreen');
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Text>register loading screen</Text>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
