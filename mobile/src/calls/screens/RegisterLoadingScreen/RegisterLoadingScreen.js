import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class RegisterLoadingScreen extends React.Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    activeNumber: PropTypes.string,
    phoneService: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired
    }).isRequired,
    token: PropTypes.string
  };

  static defaultProps = {
    activeNumber: null,
    token: ''
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.bootstrap();
  }

  componentDidUpdate() {
    this.bootstrap();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrap = async () => {
    const {
      connected,
      navigation,
      phoneService,
      activeNumber,
      token
    } = this.props;

    if (activeNumber) {
      phoneService.authenticateUser(activeNumber, token);
      navigation.navigate('AppRegistered');
    } else {
      console.log('No active number. Opening registration screen.');
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      navigation.navigate(connected ? 'AppRegistered' : 'Register');
    }
  };

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
