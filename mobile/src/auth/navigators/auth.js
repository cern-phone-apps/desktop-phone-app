import { createStackNavigator } from 'react-navigation';
import LoginScreenContainer from '../screens/LoginScreen/LoginScreenContainer';
import LoginWebViewContainer from '../screens/LoginWebView/LoginWebViewContainer';
import ColorPalette from '../../styles/ColorPalette';

export default createStackNavigator({
  SignIn: {
    screen: LoginScreenContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white'
      },
      title: `Sign in`,
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  },
  LoginWebView: {
    screen: LoginWebViewContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white'
      },
      title: `Input your credentials`,
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  }
});
