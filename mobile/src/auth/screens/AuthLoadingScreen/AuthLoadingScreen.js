import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StatusBar, View } from 'react-native';

/**
 * Check if the user is logged in and redirect him to the correct screen
 */
export class AuthLoadingScreen extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    getMe: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.redirectToApp();
  }

  // Fetch the token from storage then navigate to our appropriate place
  redirectToApp = async () => {
    const { loggedIn, navigation, getMe } = this.props;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (loggedIn) {
      console.log('Obtaining user information');
      getMe();
    }
    navigation.navigate(loggedIn ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
