import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import DialpadStack from './call';
import RecentStack from './recent';
import SettingsStack from '../../settings/navigators/settings';
import RegisterLoadingScreenContainer from '../screens/RegisterLoadingScreen/RegisterLoadingScreenContainer';
import RegisterStack from './register';
import ContactsStack from './contacts';
import CallModalScreenContainer from '../screens/CallModalScreen/CallModalScreenContainer';

export const AppStack = createBottomTabNavigator(
  {
    Call: DialpadStack,
    Recent: RecentStack,
    Contacts: ContactsStack,
    Settings: SettingsStack
  },
  {
    hiddenTabs: ['Calling'],
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = Ionicons;
        let iconName;

        if (routeName === 'Call') {
          iconName = `ios-call`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        } else if (routeName === 'Recent') {
          iconName = `ios-time`;
        } else if (routeName === 'Contacts') {
          iconName = `ios-contacts`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#c7c9c3',
      style: {
        backgroundColor: '#2196F3'
      }
    }
  }
);

/**
 * CallingScreen and AppTabs need to be at the same level if we want to hide the
 * tabs when we make a call.
 */
export const CallingStack = createStackNavigator({
  AppTabs: {
    screen: AppStack,
    headerMode: 'none',
    navigationOptions: () => ({ header: null })
  },
  /**
   * This screen is displayed over the AppTabs to handle the incoming and outgoing calls
   */
  Calling: {
    screen: CallModalScreenContainer,
    navigationOptions: () => ({
      mode: 'modal'
    })
  }
});

export const AppFullStack = createSwitchNavigator(
  {
    RegisterLoading: RegisterLoadingScreenContainer,
    AppRegistered: CallingStack,
    Register: RegisterStack
  },
  {
    initialRouteName: 'RegisterLoading'
  }
);
