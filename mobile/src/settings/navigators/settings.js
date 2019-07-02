import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ColorPalette from '../../styles/ColorPalette';
import ProfileContainer from '../components/profile/ProfileContainer';
import RegisterScreenContainer from '../../calls/screens/RegisterScreen/RegisterScreenContainer';
import CallForwardingScreenContainer from '../screens/CallForwardingScreen/CallForwardingScreenContainer';
import SearchUsersScreenContainer from '../../calls/screens/SearchUsersScreen/SearchUsersScreenForwardingContainer';
import { formatResultsOneLinePerPhone } from '../../common/utils/formatters';

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => {
      return {
        headerTitleStyle: {
          color: 'white'
        },
        title: 'Settings',
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: () => {
      return {
        title: 'Profile',
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  },

  RegisterNumber: {
    screen: RegisterScreenContainer,
    navigationOptions: () => {
      return {
        title: 'Select your number',
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  },
  CallForwarding: {
    screen: CallForwardingScreenContainer,
    navigationOptions: () => {
      return {
        title: `Call Forwarding Settings`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  },
  SearchUsers: {
    screen: props => (
      <SearchUsersScreenContainer
        {...props}
        formatSearchResults={formatResultsOneLinePerPhone}
      />
    ),
    navigationOptions: () => ({
      title: 'Search for users',
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  }
});

export default SettingsStack;
