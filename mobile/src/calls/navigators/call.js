import { createStackNavigator } from 'react-navigation';
import DialpadScreenContainer from '../screens/DialpadScreen/DialpadScreenContainer';
import ColorPalette from '../../styles/ColorPalette';

const DialpadStack = createStackNavigator({
  Dialpad: {
    screen: DialpadScreenContainer,
    navigationOptions: () => {
      return {
        headerTitleStyle: {
          color: 'white'
        },
        title: `Dialer`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  }
});

export default DialpadStack;
