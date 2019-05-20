import { createStackNavigator } from 'react-navigation';
import DialpadScreenContainer from '../screens/DialpadScreen/DialpadScreenContainer';

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
          backgroundColor: '#2196F3'
        },
        headerTintColor: 'white'
      };
    }
  }
});

export default DialpadStack;
