import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ColorPalette from '../../styles/ColorPalette';
import ProfileContainer from '../components/profile/ProfileContainer';
import RegisterScreenContainer from '../../calls/screens/RegisterScreen/RegisterScreenContainer';

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => {
      return {
        headerTitleStyle: {
          color: 'white'
        },
        title: `Settings`,
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
  }
});

export default SettingsStack;
