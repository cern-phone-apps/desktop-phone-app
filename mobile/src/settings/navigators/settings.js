import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import withOnGoingCallBanner from '../../common/utils/calls';

const SettingsStack = createStackNavigator({
  Settings: withOnGoingCallBanner(SettingsScreen)
});

export default SettingsStack;
